const nodemailer = require('nodemailer');
require('dotenv').config();


const transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com', //  host SMTP 
    port: 465, //  puede ser 465 para SSL o 587 para TLS
    secure: true, // true para 465, false para otros puertos
    auth: {
        user: process.env.EMAIL_SERVER_USER, //  dirección de correo
        pass: process.env.EMAIL_SERVER_PASS, //  contraseña de correo
    },
});

const sendVerificationEmail = async (to, token) => {
    const mailOptions = {
        from: `"CUADRANTE - APP" <${process.env.EMAIL_SERVER_USER}>`,
        to: to,
        subject: 'Verificación de correo electrónico',
        text: `Hola, para completar tu registro en la app, por favor verifica tu correo electrónico utilizando este enlace: http://tu-dominio.com/verify?token=${token}`,
        html: `<p>Hola, por favor verifica tu correo electrónico utilizando este enlace: <a href="http://tu-dominio.com/verify?token=${token}">Verificar</a></p>`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Correo de verificación enviado');
    } catch (error) {
        console.error('Error enviando correo de verificación:', error);
        throw new Error('No se pudo enviar el correo de verificación');
    }
};

module.exports = { sendVerificationEmail };
