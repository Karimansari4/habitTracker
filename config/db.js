const mongoose = require('mongoose')

module.exports = (connect) = async(req, res) => {
    try {
        const repsonse = await mongoose.connect('mongodb+srv://karimansari496:ARHSkOZrlUnAAH9o@nodeauthcluster.hfe5rfc.mongodb.net/')
        console.log("Database Connected Successfully.");
    } catch (error) {
        console.log("Mongoose Connection Error: ", error);
    }
}