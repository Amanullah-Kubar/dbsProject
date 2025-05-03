import express from 'express';
import db from '../db.js';

const router = express.Router();


// GET /api/donors?bloodType=A+
router.get("/donors", async (req, res) => {
  const { bloodType } = req.query;
  try {
    const donors = await Donor.find({ bloodType });
    res.json(donors);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch donors." });
  }
});

// Get current inventory
router.get('/inventory', async (req, res) => {
  try {
    const [rows] = await db.promise().query('SELECT * FROM blood_inventory WHERE expiry_date > CURDATE()');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching inventory:', error);
    res.status(500).json({ error: 'Failed to fetch inventory' });
  }
});


router.get('/blood-group/:bloodGroup', async (req, res) => {
  try {
    const { bloodGroup } = req.params;

    const [rows] = await db
      .promise()
      .query('SELECT * FROM blood_inventory WHERE blood_group = ? AND expiry_date > CURDATE()', [bloodGroup]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'No matching donors found with this blood group.' });
    }

    res.json(rows);
  } catch (error) {
    console.error('Error fetching inventory:', error);
    res.status(500).json({ error: 'Failed to fetch inventory' });
  }
});


// Create blood request and update inventory
router.post('/blood-request', async (req, res) => {
  const { bloodGroup, units, patientName, hospital, contactNumber } = req.body;
  
  try {
    // Start transaction
    await db.promise().beginTransaction();

    // Check if enough blood is available
    const [inventory] = await db.promise().query(
      'SELECT SUM(units) as total_units FROM blood_inventory WHERE blood_type = ? AND expiry_date > CURDATE()',
      [bloodGroup]
    );

    if (!inventory.length || inventory[0].total_units < units) {
      await db.promise().rollback();
      return res.status(400).json({ error: 'Insufficient blood units available' });
    }

    // Create blood request
    const [requestResult] = await db.promise().query(
      'INSERT INTO blood_requests (patient_name, blood_type, units_needed, hospital, contact_number, status) VALUES (?, ?, ?, ?, ?, "Pending")',
      [patientName, bloodGroup, units, hospital, contactNumber]
    );

    // Update inventory - we'll need to update multiple records if needed
    // First, get all available inventory items for this blood type
    const [availableInventory] = await db.promise().query(
      'SELECT id, units FROM blood_inventory WHERE blood_type = ? AND expiry_date > CURDATE() ORDER BY expiry_date ASC',
      [bloodGroup]
    );

    let remainingUnits = units;
    
    // Update each inventory item until we've allocated all requested units
    for (const item of availableInventory) {
      if (remainingUnits <= 0) break;
      
      const unitsToDeduct = Math.min(remainingUnits, item.units);
      
      await db.promise().query(
        'UPDATE blood_inventory SET units = units - ? WHERE id = ?',
        [unitsToDeduct, item.id]
      );
      
      remainingUnits -= unitsToDeduct;
    }

    // Commit transaction
    await db.promise().commit();

    res.json({
      message: 'Blood request created and inventory updated successfully',
      requestId: requestResult.insertId
    });
  } catch (error) {
    // Rollback transaction on error
    await db.promise().rollback();
    console.error('Error processing blood request:', error);
    res.status(500).json({ error: 'Failed to process blood request' });
  }
});

router.post('/update_status', async (req, res) => {
  const { requestId, status } = req.body;

  try {
    const [result] = await db.promise().query(
      'UPDATE blood_requests SET status = ? WHERE id = ?',
      [status, requestId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Blood request not found' });
    }

    res.json({ message: 'Blood request status updated successfully' });
  } catch (error) {
    console.error('Error updating blood request status:', error);
    res.status(500).json({ error: 'Failed to update blood request status' });
  }
}
);

// Get blood request status
router.get('/blood-request/:requestId', async (req, res) => {
  try {
    const [request] = await db.promise().query(
      'SELECT * FROM blood_requests WHERE id = ?',
      [req.params.requestId]
    );
    
    if (!request.length) {
      return res.status(404).json({ error: 'Blood request not found' });
    }
    
    res.json(request[0]);
  } catch (error) {
    console.error('Error fetching blood request:', error);
    res.status(500).json({ error: 'Failed to fetch blood request' });
  }
});

// Get all blood requests
router.get('/blood-requests', async (req, res) => {
  try {
    const [requests] = await db.promise().query(
      'SELECT * FROM blood_requests ORDER BY created_at DESC'
    );
    
    res.json(requests);
  } catch (error) {
    console.error('Error fetching blood requests:', error);
    res.status(500).json({ error: 'Failed to fetch blood requests' });
  }
});



router.post('/register_donor', async (req, res) => {
  const {
    name, age, gender, blood_type, last_donated,
    phone, email, city,
    no_chronic_illness, not_donated_in_3_months, consent_to_contact
  } = req.body;

  try {
    const [result] = await db.promise().query(
      'INSERT INTO donors (name, age, gender, blood_type, last_donated, phone, email, city, no_chronic_illness, not_donated_in_3_months, consent_to_contact) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [name, age, gender, blood_type, last_donated, phone, email, city, no_chronic_illness, not_donated_in_3_months, consent_to_contact]
    );
    res.status(201).json({ message: 'Donor registered successfully', donorId: result.insertId });
  } catch (error) {
    console.error('Error registering donor:', error);
    res.status(500).json({ error: 'Failed to register donor' });
  }
});


export default router; 