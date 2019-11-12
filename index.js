'use strict'

const express = require ('express')
const bodyParser = require('body-parser') // parsea el array y lo convierte en json
const mongoose  = require ('mongoose')
const Clientes = require('./models/clientes')


 const app = express()
const port = process.env.PORT || 3001

 app.use(bodyParser.urlencoded({ extended: false}))
 app.use(bodyParser.json())

//mostrar todos
 app.get('/api/clientes', (req, res)=>{
     Clientes.find({}, (err, clientes)=>{
         if(err)return res.status(500).send({message: 'error al realizar la peticion'})
         if (!clientes) return res.status(404).send({message: 'el cliente no existe'})
         res.status(200).send({clientes: clientes})

        })
     
     
    
 })
    





// insertar
app.post('/api/clientes', (req, res ) => {
    console.log('POST /api/clientes')
    console.log(req.body)

    let clientes = new Clientes()
    clientes.identificacion = req.body.identificacion
    clientes.nombres = req.body.nombres
    clientes.telefono = req.body.telefono
    clientes.direccion = req.body.identificacion

    clientes.save((err, clientesStored)=>{
        if (err) res.status(500).send({message:'error en guardar en la base de datos'})
        res.status(200).send({clientes: clientesStored})
    })

})

app.put('/api/clientes/:clientesId', (req, res)=>{
    let clientesId = req.params.clientesId
    let update = req.body
    Clientes.findOneAndUpdate(clientesId,update,(err, clientesUpdate)=>{
        if (err) res.status(500).send({message:'error al actualizar cliente en la base de datos'})
        res.status(200).send({clientes : clientesUpdate})
    })
})



//eliminar cliente 

app.delete('/api/clientes/:clientesId', (req, res)=>{
    let clientesId = req.params.clientesId
    Clientes.findById(clientesId,(err, clientes )=>{
        if (err) res.status(500).send({ message: 'error al eliminar cliente'})
        clientes.remove(err =>{
            if (err)  res.status(500).send({message:'error en guardar en la base de datos'})
            res.status(200).send({message:'el cliente ha sido eliminado'})


        })
    })

})


// mostrar por id
app.get('/api/clientes/:clientesId',(req, res ) => {
    let clientesId = req.params.clientesId

    Clientes.findById(clientesId, (err, clientes ) => {
        if (err) return res.status(500).send({message: 'error al realizar la peticion'})
        if (!Clientes) return res.status(404).send({message: 'el cliente no existe'})
        res.status (200).send({clientes:clientes})

    })


})

// conexion a la base de datos
mongoose.connect('mongodb://localhost/clientes',(err, res) => {
    if(err){
        return console.log('error al conectar la base de datos')
    }

    console.log('conexion a la base de datos establecida')
   



    app.listen(port, () => {
        console.log(`api rest corriendo en local: ${port}`)
    })
})

