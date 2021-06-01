const express = require("express")

const { rows } = require("./src/pg")

const nodemailer = require("nodemailer")

const app = express()

const PORT = 4848

const dotenv = require("dotenv")

dotenv.config()

app.use(express.json())

app.use((_, res, next) => {
  res.set({
    "Access-Control-Allow-Origin": '*',
    "Access-Control-Allow-Headers": '*'
  })

  next()
})

app.post("/post", async (req, res) => {
  const { name, message, email } = req.body

  console.log(name, message, email);

  const SQL = `
  insert into users(user_name, user_email, user_message) values($1, $2, $3)
  `
  await rows(SQL, name, email, message)


  var transporter = await nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    service: 'gmail',
    auth: {
      user: 'omonbekmurodov@gmail.com',
      pass: 'GoG490Nomo4711'
    },
    tls: {
      rejectUnauthorized: true
    }
  });

  var mailOptions = {
    from: `"Nodemailer Contact" ${email}`,
    to: 'omonbekmurodov@gmail.com',
    subject: name,
    text: message
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  console.log(email);

  res.status(201).send({message: "ok"})
})

app.listen(PORT, () => console.log(PORT))