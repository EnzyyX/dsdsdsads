const Discord = require("discord.js");
const axios = require ('axios')

module.exports.run = async (client, message, args) => {

    if(!client.config.Owner.includes(message.author.id) && !message.member.roles.cache.some(r => client.config.StaffHub.includes(r.id))) return

    axios({
        method: 'get',
        url: 'http://meme-api.herokuapp.com/gimme'
    }).then(async res => {

        let x = 0

        while (x < 1) {

            if (res.data.nsfw === false) {

                const embed = new Discord.EmbedBuilder()
                    .setTitle(`Source: ${res.data.title}`)
                    .setURL(res.data.postLink)
                    .setImage(res.data.preview[2])
                    .setFooter({ text: `Pulled from the subreddit: ${res.data.subreddit}` })
                    .setColor("#030303")

                message.reply({ embeds: [embed] })

                x++
            }}

    }).catch(err => message.reply({ content: `> There was an error while executing this command, please contact the [**Enigma Support Team**](https://discord.gg/u5T5cZAFWb)!` }))
}


module.exports.config = {
    name: "meme",
    aliases: [],
    description: 'This will get a random meme from the meme api that gets memes from reddit',
}