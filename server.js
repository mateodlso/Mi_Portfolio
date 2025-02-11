const nodemailer = require("nodemailer");
require("dotenv").config(); // Asegúrate de que las variables de entorno estén cargadas
const express = require("express");
const app = express();

// Middleware para parsear el JSON del body
app.use(express.json());

app.post("/send", (req, res) => {
    const { name, email, message } = req.body;  // Aquí recibes los datos del formulario

    const transporter = nodemailer.createTransport({
        service: "Gmail", // Usamos el servicio Gmail
        auth: {
            user: process.env.EMAIL_USER,  // Tu correo configurado en las variables de entorno
            pass: process.env.EMAIL_PASS,  // La contraseña de aplicación de Gmail
        },
    });

    // Configuración del correo
    const mailOptions = {
        from: email,  // El correo del usuario que llenó el formulario
        to: process.env.EMAIL_USER,  // Tu correo para recibir el mensaje
        subject: `Nuevo mensaje de contacto de ${name}`,  // Asunto
        text: message,  // Cuerpo del mensaje
    };

    // Enviar el correo
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Error al enviar el correo:", error);
            return res.status(500).json({ error: "Error al enviar el mensaje" });
        }
        console.log("Correo enviado:", info);
        res.status(200).json({ success: "Mensaje enviado exitosamente" });
    });
});

// Configura el puerto
app.listen(3000, () => console.log("Servidor en ejecución en http://localhost:3000"));
