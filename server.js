const express = require('express')
const fetch = require('node-fetch')
const bodyParser = require('body-parser')

const submits = require('./submits')

const app = express()

const apiKey = 'yCGLyGCu3ku06igcN7JQUQ'
const PORT = 5000

const jsonParser = bodyParser.json()

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
})

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
    const apiUrl = `https://checking.sybon.org/api/Submits/send?api_key=${apiKey}`
    const buffer = new Buffer(req.body.solution)
    const body = {
        compilerId: req.body.compilerId,
        solution: buffer.toString('base64'),
        solutionFileType: "Text",
        problemId: req.body.problemId,
        pretestsOnly: false,
        continueCondition: "WhileOk"
    }
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    }
    const fetchResponse = await fetch(apiUrl, options)
    const json = await fetchResponse.json()
    res.setHeader("Access-Control-Allow-Origin", "*");
    return res.status(201).send({
        success: "true",
        message: "submit added successfully",
        json,
    });
})


try {
    app.listen(PORT, () => console.log(`App listening on http://localhost:${PORT}`));
} catch (e) {
    console.log(e)
}

