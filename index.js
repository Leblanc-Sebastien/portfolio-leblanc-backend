const express = require("express")
const nodemailer = require("nodemailer");
const cors = require("cors")

require('dotenv').config()

//express **************************

const app = express()
const port = 3000

app.listen(port, () => {
    console.log(`Application Node démarrée sur : http://localhost:${port}`)
})

app.use(express.json()) // for parsing application/json
app.use(cors())

//nodemailer **************************

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: process.env.USER,
        pass: process.env.APP_PASSWORD
    },
});


const mailOptions = {
    from: {
        name: 'Sebastien Leblanc',
        adress: process.env.USER
    },
    to: ["leblanc.sbt@gmail.com"],
    subject: 'test nodemailer - send',
    text: "hello world",
    html: "<b>prout</<b>"
}

const sendMail = async (transporter, mailOptions) => {
    try {
        await transporter.sendMail(mailOptions)
        console.log("Email envoyé correctement!")
    }
    catch (error) {
        console.log(error)
    }
}

//routes **************************

app.post('/api/postemail/', (req, res, next) => {
    const emailCreated = req.body

    const mailOptions = {
        from: {
            name: `${emailCreated.fullName}`,
            adress: "sugii.noob@gmail.com"
        },
        to: ["leblanc.sbt@gmail.com"],
        subject: `${emailCreated.subject}`,
        text: `${emailCreated.message}`,
        html: ` <h1>Email envoyé du portfolio</h1>
                <h2>${emailCreated.subject}</h2>
                <h3>${emailCreated.fullName}</h3>
                <h3>${emailCreated.email}</h3>
                <h3>${emailCreated.phone}</h3>
                <p>${emailCreated.message}</p>`
    }

    sendMail(transporter, mailOptions)

    res.json(emailCreated)
})

