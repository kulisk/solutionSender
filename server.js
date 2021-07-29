const express = require('express')
const fetch = require('node-fetch')
const {param} = require("express");

const app = express()

const apiKey = 'yCGLyGCu3ku06igcN7JQUQ'
const PORT = 5000

app.get('/', async (req, res) => {
    const apiUrl = `https://archive.sybon.org/api/Collections/20?api_key=${apiKey}`
    const fetchResponse = await fetch(apiUrl)
    const json = await fetchResponse.json()
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.send(json)
})

app.get('/:id', async (req, res) => {
    const apiUrl = `https://archive.sybon.org/api/Problems/${req.params.id}/statement?api_key=${apiKey}`
    const fetchResponse = await fetch(apiUrl)
    const text = await fetchResponse.text()
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.send(text)
})

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
