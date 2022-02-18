const mongoose = require('mongoose')

const connectDb = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/longue_404')
    } catch (error) {
        console.log('error connect db')
    }
}

module.exports = connectDb