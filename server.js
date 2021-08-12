const express = require('express')
const fetch = require('node-fetch')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const Submit = require('./models/Submit')

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

app.get('/submits', async (req, res) => {
    const submits = await Submit.find();
    const results = [];
    for (let i = 0; i < submits.length; i++) {
        const apiUrl = `https://checking.sybon.org/api/Submits/results?ids=${submits[i].submitId}&api_key=${apiKey}`
        const fetchResponse = await fetch(apiUrl)
        const json = await fetchResponse.json()
        results.push({problemName: submits[i].problemName, status: json[0].buildResult.status})
    }
    return res.status(200).send({
        success: "true",
        message: "Submits list",
        results
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
    const submit = new Submit({
        compilerId: req.body.compilerId,
        solution: buffer.toString('base64'),
        problemId: req.body.problemId,
        problemName: req.body.problemName,
        submitId: json
    })
    await submit.save()
    res.setHeader("Access-Control-Allow-Origin", "*");
    return res.status(201).send({
        success: "true",
        message: "submit added successfully",
        json,
    });
})

async function start() {
    try {
        await mongoose.connect("mongodb+srv://dbUser:yikUgRPF4IHF2eYc@cluster0.jbv31.mongodb.net/sumbits?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })
        app.listen(PORT, () => console.log(`App listening on http://localhost:${PORT}`));
    } catch (e) {
        console.log(e)
    }
}

start()