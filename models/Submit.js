const {Schema, model} = require('mongoose')

const schema = new Schema({
    compilerId: {
        type: Number,
    },
    solution: {
        type: String,
    },
    problemId: {
        type: Number,
    },
    submitId: {
        type: Number,
    }
})

module.exports = model('Submit', schema)