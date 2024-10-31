// 
const express = require ('express')
const cors = require('cors')
const app = express()
const mongoose = require("mongoose")
require("dotenv").config()
URI = process.env.MONGODB_URL


app.use(express.json())
app.use(cors())

const Filme = mongoose.model ("Filme", mongoose.Schema({
        titulo: {type: String},
        sinopse: {type: String}
    }
))

async function conectarAoMongoDB() {
    await
       mongoose.connect(URI)
}
        


let filmes = [
    {
    titulo: "Forrest Gump - O Contador de Histórias",
    sinopse: "Quarenta anos da história dos Estados Unidos, vistos pelos olhos de Forrest Gump (Tom Hanks), um rapaz com QI abaixo da média e boas intenções."
    },
    {
    titulo: "Um Sonho de Liberdade",
    sinopse: "Em 1946, Andy Dufresne (Tim Robbins), um jovem e bem sucedido banqueiro, tem a sua vida radicalmente modificada ao ser condenado por um crime que nunca cometeu, o homicídio de sua esposa e do amante dela"
    }
]
    

//GET http://localhost:3000/hey
app.get('/hey', (req, res) => {
    res.send('hey')
    })
    

app.get('/filmes', (req, res) => {
     res.json(filmes)
    })

app.post("/filmes", (req, res) => {
        //obtém os dados enviados pelo cliente
     const titulo = req.body.titulo
     const sinopse = req.body.sinopse
     //monta um objeto agrupando os dados. Ele representa um novo filme
     const filme = {titulo: titulo, sinopse: sinopse}
     //adiciona o novo filme à base
     filmes.push(filme)
     //responde ao cliente. Aqui, optamos por devolver a base inteira ao cliente, embora não seja obrigatório.
     res.json(filmes)
    })
        


// app.listen(3000, () => console.log("up and running"))

app.listen(3000, () => {
    try{
        conectarAoMongoDB()
        console.log("up and running")
    }
    catch (e){
        console.log('Erro', e)
    }
})
    