const mongoose = require('mongoose')
const Schema = mongoose.Schema

const HabitSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    dates: [{
        date: String,
        complete: String
    }],
    favorite: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

const Habit = mongoose.model('habit', HabitSchema)
module.exports = Habit