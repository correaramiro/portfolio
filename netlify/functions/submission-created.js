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
                    @layer root {
                        :root {
                            --azul: hsl(213, 100%, 50%);
                            --gradient-color: linear-gradient(90deg, hsl(213, 100%, 50%) 0%, hsl(213, 100%, 85%) 40%, hsl(213, 100%, 85%) 60%, hsl(213, 75%, 60%) 100%);
                            --negro: hsl(0, 0%, 6%);
                            --negro-2: hsl(0, 0%, 20%);
                            --blanco: hsl(0, 0%, 96%);
                            --texto: hsl(213, 4%, 70%);

                            --poppins: 'Poppins', sans-serif;
                            --syne: 'Syne', sans-serif;

                            --z-tooltip: 10;
                            --z-fixed: 100;
                        }
                    }
                    @layer fonts {
                        /* poppins-200 - latin */
                        @font-face {
                        font-display: swap; /* Check https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display for other options. */
                        font-family: 'Poppins';
                        font-style: normal;
                        font-weight: 200;
                        src: url('assets/fonts/poppins-v24-latin-200.woff2') format('woff2'); /* Chrome 36+, Opera 23+, Firefox 39+, Safari 12+, iOS 10+ */
                        }

                        /* poppins-regular - latin */
                        @font-face {
                        font-display: swap; /* Check https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display for other options. */
                        font-family: 'Poppins';
                        font-style: normal;
                        font-weight: 400;
                        src: url('assets/fonts/poppins-v24-latin-regular.woff2') format('woff2'); /* Chrome 36+, Opera 23+, Firefox 39+, Safari 12+, iOS 10+ */
                        }

                        /* poppins-900 - latin */
                        @font-face {
                        font-display: swap; /* Check https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display for other options. */
                        font-family: 'Poppins';
                        font-style: normal;
                        font-weight: 900;
                        src: url('assets/fonts/poppins-v24-latin-900.woff2') format('woff2'); /* Chrome 36+, Opera 23+, Firefox 39+, Safari 12+, iOS 10+ */
                        }

                        /* syne-regular - latin */
                        @font-face {
                        font-display: swap; /* Check https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display for other options. */
                        font-family: 'Syne';
                        font-style: normal;
                        font-weight: 400;
                        src: url('assets/fonts/syne-v24-latin-regular.woff2') format('woff2'); /* Chrome 36+, Opera 23+, Firefox 39+, Safari 12+, iOS 10+ */
                        }

                        /* syne-600 - latin */
                        @font-face {
                        font-display: swap; /* Check https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display for other options. */
                        font-family: 'Syne';
                        font-style: normal;
                        font-weight: 600;
                        src: url('assets/fonts/syne-v24-latin-600.woff2') format('woff2'); /* Chrome 36+, Opera 23+, Firefox 39+, Safari 12+, iOS 10+ */
                        }

                        /* syne-800 - latin */
                        @font-face {
                        font-display: swap; /* Check https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display for other options. */
                        font-family: 'Syne';
                        font-style: normal;
                        font-weight: 800;
                        src: url('assets/fonts/syne-v24-latin-800.woff2') format('woff2'); /* Chrome 36+, Opera 23+, Firefox 39+, Safari 12+, iOS 10+ */
                        }
                    }
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