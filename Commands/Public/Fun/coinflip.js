const Discord = require("discord.js");
const random = require ('random')

module.exports.run = async (client, message, args) => {

    if(!client.config.Owner.includes(message.author.id) && !message.member.roles.cache.some(r => client.config.StaffHub.includes(r.id))) return

    const coin = [`heads`, `tails`,];
    const index = random.int(0, coin.length - 1)

    let result = (coin[index])

    const Embed = new Discord.EmbedBuilder()
        .setColor("#030303")
        .setTitle(`Flip Result`)
        .setDescription(`> The coin was flipped and the result is **${result}**! 🪙`)
        .setFooter({ text: `Better luck next time ;)` })

    message.reply({ embeds: [Embed] });
}


module.exports.config = {
    name: "flip",
    aliases: ["coinflip"],
    description: 'Flip a coin and get an answer of either heads or tails',
}