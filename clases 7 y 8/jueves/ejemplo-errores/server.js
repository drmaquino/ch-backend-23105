const express = require('express')
const { Router } = express

const app = express()

const mensajeDeError = 'se rompio todo!'
// app.use(express.static('public'))

app.use((req, res, next) => {
    try {
        throw Error(mensajeDeError)
    } catch (error) {
        next(error)
    }
})

app.use((err, req, res, next) => {
    if (err.message == mensajeDeError) {
        res.status(500).json({ error: mensajeDeError })
    } else {
        next(err)
    }
})

app.use((err, req, res, next) => {
    if (err.message == mensajeDeError) {
        res.status(500).json({ error: mensajeDeError })
    } else {
        next(err)
    }
})

/* ------------------------------------------------------ */
/* Mascotas */

const routerMascotas = new Router()
routerMascotas.use(express.json())
routerMascotas.use(express.urlencoded({ extended: true }))

const mascotas = []

routerMascotas.get('/', (req, res) => {
    res.json(mascotas)
})

routerMascotas.post('/', (req, res, next) => {
    try {
        mascotas.push(req.body) // puede fallar
        res.json(req.body)
    } catch (error) {
        next(error)
    }
})

routerMascotas.use((err, req, res, next) => {
    if (err.message == mensajeDeError) {
        res.status(500).json({ error: 'error de mascotas' })
    } else {
        next(err)
    }
})

/* ------------------------------------------------------ */
/* Personas */

const routerPersonas = new Router()
routerPersonas.use(express.json())
routerPersonas.use(express.urlencoded({ extended: true }))

const personas = []

routerPersonas.get('/', (req, res) => {
    res.json(personas)
})

routerPersonas.post('/', (req, res) => {
    personas.push(req.body)
    res.json(req.body)
})

/* ------------------------------------------------------ */
/* Cargo los routers */
app.use('/api/mascotas', routerMascotas)
app.use('/api/personas', routerPersonas)

/* ------------------------------------------------------ */
/* Server Listen */
const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))
