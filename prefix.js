const mongoose = require('mongoose')

const prefix = mongoose.Schema({
    
    GuildName: String,
    GuildID: String,
    Prefix: String

})

module.exports = mongoose.model('-prefixes', prefix)