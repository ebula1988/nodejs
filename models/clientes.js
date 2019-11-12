const mongoose  = require ('mongoose')
const Schema = mongoose.Schema

const ClientesSchema = Schema({
    identificacion: String,
    nombres: String,
    telefono: Number,
    direccion: String
    
})

module.exports = mongoose.model('clientes', ClientesSchema)