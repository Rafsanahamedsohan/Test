const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from 'public' directory

// Route for serving HTML form
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Route for sending email
app.post('/sendEmail', (req, res) => {
  const { email, subject, message } = req.body;

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'rafsanahamedsohan@gmail.com', // Your Gmail address
      pass: 'your-password' // Your Gmail password or an app-specific password
    }
  });

  let mailOptions = {
    from: email,
    to: 'rafsanahamedsohan@gmail.com', // Recipient's email address
    subject: subject,
    text: message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send('Error: Email sending failed');
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Email sent successfully');
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});