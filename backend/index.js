import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'blood_donation',
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// API Routes

// Get all donors
app.get('/api/donorsdetails', (req, res) => {
    const query = 'SELECT * FROM donors';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to add donor', details: err.message });
        }
        res.json(results);
    });
});

// Add a new donor
app.post('/api/donors', (req, res) => {
    const {
        name,
        blood_group,
        contact_number,
        email,
        city,
        postal_code,
        last_donation_date,
        healthy,
        no_chronic_illness,
        not_donated_in_3_months,
        consent_to_contact
    } = req.body;

    const query = `
      INSERT INTO donors (
        name, blood_group, contact_number, email, city,
        postal_code, last_donation_date, healthy, no_chronic_illness,
        not_donated_in_3_months, consent_to_contact
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(query, [
        name,
        blood_group,
        contact_number,
        email,
        city,
        postal_code,
        last_donation_date,
        healthy,
        no_chronic_illness,
        not_donated_in_3_months,
        consent_to_contact
    ], (err, result) => {
        if (err) {
            console.error('Error inserting donor:', err);
            return res.status(500).json({ error: 'Failed to add donor' });
        }
        res.status(201).json({ message: 'Donor added successfully' });
    });
});

app.post('/api/requests', async (req, res) => {
    const {
        patientName,
        age,
        gender,
        bloodGroup,
        unitsRequired,
        dateNeeded,
        hospital,
        contactNumber,
        notes
    } = req.body;

    try {
        // Save the request to database
        await db.promise().query(
            `INSERT INTO requests 
            (patientName, age, gender, bloodGroup, unitsRequired, dateNeeded, hospital, contactNumber, notes) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [patientName, age, gender, bloodGroup, unitsRequired, dateNeeded, hospital, contactNumber, notes]
        );

        // Get matching donors
        const [matches] = await db.promise().query(
            `SELECT * FROM donors 
             WHERE blood_group = ? 
             AND healthy = 1 
             AND no_chronic_illness = 1 
             AND not_donated_in_3_months = 1`,
            [bloodGroup]
        );

        res.status(201).json({ message: 'Request submitted successfully', matches });
    } catch (error) {
        console.error('Error handling request:', error);
        res.status(500).json({ error: 'Server error' });
    }
});


// Root
app.get('/', (req, res) => {
    res.send('Blood Donation API is running...');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
