const Discord = require ('discord.js')

module.exports.run = async (bot, message, args) => { message.delete()

    if(!bot.config.Developer.includes(message.author.id)) return

    const row = new Discord.ActionRowBuilder()
    .addComponents(
        new Discord.ButtonBuilder()
        .setCustomId("yes")
        .setLabel("Fortnite")
        .setEmoji("<:fortnite:1020361763717394573>")
        .setStyle("Primary"),

        new Discord.ButtonBuilder()
        .setCustomId("no1")
        .setLabel("VALORANT")
        .setStyle("Primary")
        .setEmoji("<:Valorant:1020361417980911616>"),

        new Discord.ButtonBuilder()
        .setCustomId("no")
        .setLabel("WarZone")
        .setStyle("Primary")
        .setEmoji("<:WarZone:1020363083648073728>")
    )

    message.channel.send({ components: [row] })

}
module.exports.config = {
    name: 'skrm',
    category: "config",
}