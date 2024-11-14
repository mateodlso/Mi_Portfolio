require("dotenv").config(); // Cargar las variables de entorno
const express = require("express");
const nodemailer = require("nodemailer");
const app = express();

app.use(express.json());

app.post("/send", (req, res) => {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: email,
        to: process.env.EMAIL_USER,
        subject: `Nuevo mensaje de contacto de ${name}`,
        text: message,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ error: "Error al enviar el mensaje" });
        }
        res.status(200).json({ success: "Mensaje enviado exitosamente" });
    });
});

app.listen(3000, () => console.log("Servidor en ejecución en http://localhost:3000"));
