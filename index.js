const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const { Pool } = require('pg');

dotenv.config();
const app = express();

// const pool = new Pool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
//   port: process.env.DB_PORT,
// });

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
})

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get('/api/courses', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM courses');
      const courses = result.rows;
      res.json(courses);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  });
  
// app.post('/add-course', async (req, res) => {
//   const { code, name, creditlec, creditlab, passinggrade } = req.body;
//   try {
//     const result = await pool.query(
//       'INSERT INTO courses (code, name, creditlec, creditlab, passinggrade) VALUES ("MATH3465743", "TEST", 2, 4, "D")',
//       [code, name, creditlec, creditlab, passinggrade]
//     );
//     res.redirect('/');
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Error inserting data');
//   }
// });

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/dashboard.html'));
});
app.get('/assessment', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/assessment.html'));
});
app.get('/attendance', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/attendance.html'));
});
app.get('/courses', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/courses.html'));
});
app.get('/information', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/information.html'));
});
app.get('/learnIT', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/learnIT.html'));
});
app.get('/learnIT2', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/learnIT2.html'));
});
app.get('/learnIT3', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/learnIT3.html'));
});
app.get('/schedule', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/schedule.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
