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
app.get('/api/donors', (req, res) => {
  const query = 'SELECT * FROM donors';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database query failed' });
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
  

// Root
app.get('/', (req, res) => {
  res.send('Blood Donation API is running...');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
