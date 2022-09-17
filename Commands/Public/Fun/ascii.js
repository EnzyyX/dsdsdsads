const Discord = require("discord.js");
const figlet = require ("figlet")

module.exports.run = async (client, message, args) => {

    if(!client.config.Owner.includes(message.author.id) && !message.member.roles.cache.some(r => client.config.StaffHub.includes(r.id))) return

    figlet.text(args.join(" "), (err, text) => {

        if (err) {
            const Error_Embed = new Discord.EmbedBuilder()
                .setTitle(`Enigma Error`)
                .setColor("#030303")
                .setDescription(`> There was an error while executing this command, please contact the [**Enigma Support Team**](https://discord.gg/u5T5cZAFWb)!`)

            return message.reply({ embeds: [Error_Embed] })
        }

        const embed = new Discord.EmbedBuilder()
            .setTitle(`Your Text Asciified`)
            .setColor("#030303")
            .setDescription(`\`\`\`${text.trimRight()}\`\`\``)

        message.reply({ embeds: [embed] })
    })
}


module.exports.config = {
    name: "ascii",
    aliases: [],
    description: 'Turns your specfied text into ascii text in an embed',
}