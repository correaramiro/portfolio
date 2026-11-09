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
                <style>
                    body {font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px;}
                    .container {background-color: #ffffff; padding: 30px; border-radius: 8px; max-width: 600px; margin: auto; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);}
                    h2 {color: #2c3e50;}
                    p {color: #555555; line-height: 1.6;}
                    .footer {margin-top: 20px; font-size: 12px; color: #888888; text-align: center;}
                </style>
            </head>
            <body>
                <div class="container">
                    <h2>¡Hola, ${userName}!</h2>
                    <p>Hemos recibido tu consulta correctamente. Nos pondremos en contacto a la brevedad.</p>
                    <p>Gracias por confiar en nosotros.</p>
                </div>
                <div class="footer">
                    <p>Este es un correo generado automáticamente, por favor no respondas a este mensaje.</p>
                    <p>Si no solicitaste este correo, por favor ignóralo.</p>
                    <span>© 2026 Ramiro Correa. Todos los derechos reservados.</span>
                </div>
            </body>
            </html>
        `;
        // ENVIO
        await resend.emails.send({
            from: 'Ramiro Correa <no-reply@ramirocorrea.com.ar>',
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