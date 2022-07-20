import express from 'express'
import conectarDB from './config/db.js'
import dotenv from 'dotenv'
import cors from 'cors'
import usuarioRoutes from './routes/usuarioRoutes.js'
import proyectoRoutes from './routes/proyectoRoutes.js'
import tareaRoutes from './routes/tareaRoutes.js'


const PORT = process.env.PORT || 4000

// Inicializar servidor
const app = express()

// Procesamiento de información de tipo JSON
app.use(express.json())

// Uso de variables de entorno
dotenv.config() 

// Uso de base de datos MongoDB
conectarDB()

// Configurar CORS
const whiteList = [ process.env.FRONTEND_URL ]

const corsOptions = {

    origin: function(origin, callback) {
        
        if(whiteList.includes(origin))
        {
            // Puede consultar la API
            callback(null, true)
        }
        else
        {
            // No está permitido su request
            callback(new Error('Error de CORS'))
        }
    }
}

app.use(cors(corsOptions))

// Routing
app.use('/api/usuarios', usuarioRoutes)
app.use('/api/proyectos', proyectoRoutes)
app.use('/api/tareas', tareaRoutes)

// Lanzar Servidor
const servidor = app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})


// Socket.io
import { Server } from 'socket.io'

const io = new Server(servidor, {
    pingTimeout: 60000,
    cors: {
        origin: process.env.FRONTEND_URL
    }
})

io.on('connection', (socket) => {
    console.log('Conectado a socket.io')

    // Definir los eventos de socket.io
    socket.on('abrir proyecto', (proyecto) => {
        socket.join(proyecto)        
    })

    socket.on('nueva tarea', (tarea) => {
        const proyecto = tarea.proyecto  
        socket.on(proyecto).emit('tarea agregada', tarea)
    })
})