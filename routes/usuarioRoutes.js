import express from 'express'

import {
    registrar,
    autenticar,
    confirmar,
    olvidePassword,
    comprobarToken,
    nuevoPassword,
    perfil
} from '../controllers/usuarioController.js'

import checkAuth from '../middlewares/checkAuth.js'


const router = express.Router()

// Crea un nuevo usuario
router.post('/', registrar)

// Autenticación de usuarios
router.post('/login', autenticar)

// Confirmación de usuarios
router.get('/confirmar/:token', confirmar)

// Recuperación de password del usuario
router.post('/olvide-password', olvidePassword)

// Validar Token
router.get('/olvide-password/:token', comprobarToken)

// Almacenando el nuevo password
router.post('/olvide-password/:token', nuevoPassword)

// Las dos rutas anteriores las podría compactar de la siguiente manera:
//
//    router.route('/olvide-password/:token').get(comprobarToken)
//                                           .post(nuevoPassword)

router.get('/perfil', checkAuth, perfil)


export default router 