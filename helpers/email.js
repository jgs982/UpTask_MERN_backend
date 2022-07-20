import nodemailer from 'nodemailer'

export const emailRegistro = async(datos) => {

    const { email, nombre, token } = datos 

    // Cliente para enviar el email
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })

    // Información del Email
    const info = await transport.sendMail({
        from: ' "UpTask - Administrador de Proyectos" <cuentas@uptask.com>',
        to: email,
        subject: "UpTask - Comprueba tu Cuenta",
        text: "Comprueba tu cuenta en UpTask",
        html: `
            <p>
                Hola: ${nombre}, comprueba tu cuenta en UpTask
            </p>

            <p>
                Tu cuenta ya está casi lista, solo debes de comprobarla en
                el siguiente enlace:
                <a href='${process.env.FRONTEND_URL}/confirmar/${token}'>
                    Comprobar cuenta
                </a>
            </p>

            <p>
                Si tu no creaste esta cuenta, puedes ignorar el mensaje
            </p>
        `
    })
}


export const emailOlvidePassword = async(datos) => {

    const { email, nombre, token } = datos 

    // Cliente para enviar el email
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })

    // Información del Email
    const info = await transport.sendMail({
        from: ' "UpTask - Administrador de Proyectos" <cuentas@uptask.com>',
        to: email,
        subject: "UpTask - Restablece tu Password",
        text: "Restablece tu Password",
        html: `
            <p>
                Hola: ${nombre}, has solicitado restablecer tu password
            </p>

            <p>
                Sigue el siguiente enlace para generar un nuevo password:

                <a href='${process.env.FRONTEND_URL}/olvide-password/${token}'>
                    Restablecer Password
                </a>
            </p>

            <p>
                Si tu no solicitaste este email, puedes ignorar el mensaje
            </p>
        `
    })
}