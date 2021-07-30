const express = require('express')
const fetch = require('node-fetch')
const bodyParser = require('body-parser')

const submits = require('./submits')

const app = express()

const apiKey = 'yCGLyGCu3ku06igcN7JQUQ'
const PORT = 5000

const jsonParser = bodyParser.json()

app.get('/submits', (req, res) => {
    return res.status(200).send({
        success: "true",
        message: "Submits list",
        submits: submits
    })
})

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

app.post('/', jsonParser, async (req, res) => {
    const submit = {
        id: submits.length + 1,
        language: req.body.language,
        taskId: req.body.taskId,
        solution: req.body.solution
    };
    submits.push(submit);
    return res.status(201).send({
        success: "true",
        message: "submit added successfully",
        submit,
    });
})

app.listen(PORT, () => console.log(`App listening on http://localhost:${PORT}`));
