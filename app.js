const express = require('express');
const app = express();
const logger = require('morgan')
const cors = require('cors');
const transporter = require('./src/server/config')
const dotenv = require('dotenv')
dotenv.config();



app.use(cors());
app.use(logger('dev'))
app.use(express.json());

app.get("/a", (req, res) => {
    res.status(200).send("welcome to api of email sender")
})


app.post('/send', (req, res) => {

    try {
        const mailOption = {
            from: req.body.email,
            to: process.env.email,
            subject: req.body.subject,
            html: `<p>you have a new contact request</p>
         <h3>contact details</h3>
        <ul>
        <li>Name:${req.body.name}</li>
        <li>Email:${req.body.email}</li>
        <li>Subject:${req.body.subject}</li>
        <li>Message:${req.body.message}</li>
        </ul>`
        };

        transporter.sendMail(mailOption, function (err, info) {
            if (err) {
                res.status(500).send({
                    success: false,
                    message: 'something went wrong' + err
                });
            }
            else {
                res.send({
                    success: true,
                    message: 'thanks for contacting us'
                })
            }
        })
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: 'something went wronggg'
        })
    }
})

app.use("*", (req, res) => { res.status(300).send("route not find") })

app.listen(3030, () => console.log("server is listening on port 3030")
)