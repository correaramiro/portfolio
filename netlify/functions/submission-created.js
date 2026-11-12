import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function handler(event) {
    try {
        const body = JSON.parse(event.body);
        const payload = body.payload;

        const userEmail = payload.email;
        const userName = payload.data.name || 'Estimado/a';
        // PLANTILLA CORREO
        const htmlTemplate = `
            <!DOCTYPE html>
            <html>
            <head>
                <link rel="stylesheet" href="../../styles.css">
                <style>
                    body {font-family: var(--poppins); background-color: var(--negro); margin: 0; padding: 20px;}
                    .container {background-color: var(--negro-2); padding: 30px; border-radius: 8px; max-width: 600px; margin: auto; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);}
                    h2 {color: var(--azul); font-family: var(--syne);}
                    img {max-width: 100px; height: auto; align-self: center;}
                    p {color: var(--blanco); line-height: 1.3;}
                    .footer {margin-top: 20px; font-size: 12px; color: var(--texto); text-align: center;}
                </style>
            </head>
            <body>
                <div class="container">
                    <img src="https://ramirocorrea.com.ar/assets/img/logo1.svg" alt="Logo">
                    <h2>¡Hola, ${userName}!</h2>
                    <p>Hemos recibido tu consulta correctamente. Nos pondremos en contacto a la brevedad.</p>
                    <p>Gracias por confiar en nosotros.</p>
                </div>
                <div class="footer">
                    <p>Este es un correo generado automáticamente, por favor no respondas a este mensaje.</p>
                    <p>Si no solicitaste este correo, por favor ignóralo.</p>
                    <span>
                        <a href="https://ramirocorrea.com.ar">www.ramirocorrea.com.ar</a>
                        <a href="mailto:hola@ramirocorrea.com.ar">hola@ramirocorrea.com.ar</a>
                    </span>
                    <br>
                    <span>© 2026 Ramiro Correa. Todos los derechos reservados.</span>
                </div>
            </body>
            </html>
        `;
        // ENVIO
        await resend.emails.send({
            from: 'Ramiro Correa <hola@ramirocorrea.com.ar>',
            to: userEmail,
            subject: 'Confirmación de recepción de tu consulta',
            html: htmlTemplate
        });
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Correo de confirmación enviado correctamente.' })
        };
    } catch (error) {
        console.error('Error al enviar el correo de confirmación:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({error: error.message})
        };
    }
}