const Discord = require ('discord.js')

module.exports.run = async (bot, message, args) => { message.delete()

    if(!bot.config.Developer.includes(message.author.id)) return

    const row = new Discord.ActionRowBuilder()
    .addComponents(
        new Discord.ButtonBuilder()
        .setURL('https://twitter.com/skrmiish')
        .setLabel("Twitter")
        .setEmoji("<:Twitter:1020421241779273759>")
        .setStyle("Link"),

        new Discord.ButtonBuilder()
        .setURL('https://instagram.com/skrmiish/')
        .setLabel("Instagram")
        .setEmoji("<:Instagram:1020421701185589380>")
        .setStyle("Link"),

        new Discord.ButtonBuilder()
        .setURL('https://youtube.com/channel/UCewhh8X3rRPIKDDGxD0x9gg')
        .setLabel("Youtube")
        .setEmoji("<:Youtube:1020421124007415898>")
        .setStyle("Link"),

        new Discord.ButtonBuilder()
        .setURL('https://facebook.com/skrmiish')
        .setLabel("Facebook")
        .setEmoji("<:Facebook:1020421689965805640>")
        .setStyle("Link"),

        new Discord.ButtonBuilder()
        .setURL('https://www.tiktok.com/@skrmiish')
        .setLabel("Tiktok")
        .setEmoji("<:Tiktok:1020421709842624572>")
        .setStyle("Link"),
    )

    message.channel.send({ components: [row] })

}
module.exports.config = {
    name: 'skrmii',
    category: "config",
}