const Discord = require("discord.js");
const axios = require ('axios')

module.exports.run = async (client, message, args) => {

    if(!client.config.Owner.includes(message.author.id) && !message.member.roles.cache.some(r => client.config.StaffHub.includes(r.id))) return

    axios({
        method: 'get',
        url: "https://uselessfacts.jsph.pl/random.json?language=en"
    }).then(res => {

        const embed = new Discord.EmbedBuilder()
            .setColor("#030303")
            .setTitle('Random Fact')
            .setURL(res.data.source_url)
            .setDescription(`> ${res.data.text}`)

        message.reply({ embeds: [embed] })

    })
}


module.exports.config = {
    name: "fact",
    aliases: [],
    description: 'This will get a random fact for you from the api and send it in an embed',
}