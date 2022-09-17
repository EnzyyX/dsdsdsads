const Discord = require ('discord.js')

module.exports.run = async (bot, message, args) => { message.delete()

    if(!bot.config.Developer.includes(message.author.id)) return

    const row = new Discord.ActionRowBuilder()
    .addComponents(
        new Discord.ButtonBuilder()
        .setURL('https://youtu.be/KMJMiMbPQnE')
        .setLabel("Sign-up Guide")
        .setEmoji("<:SkrmiishGG:985986139359940678>")
        .setStyle("Link"),

        new Discord.ButtonBuilder()
        .setURL('https://youtu.be/aXvpPwsbCNI')
        .setLabel("First Match Guide")
        .setEmoji("<:_money_cash_:969178438244122704>")
        .setStyle("Link"),

        new Discord.ButtonBuilder()
        .setURL('http://skrmiish.gg/')
        .setLabel("Official Website")
        .setEmoji("🌐")
        .setStyle("Link"),
    )

    message.channel.send({ components: [row] })

}
module.exports.config = {
    name: 'skrmi',
    category: "config",
}