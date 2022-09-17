const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    if(!client.config.Owner.includes(message.author.id) && !message.member.roles.cache.some(r => client.config.StaffHub.includes(r.id))) return

    let ACTION_Channel = client.channels.cache.get('967552181370773574')

    const action_msg = new Discord.EmbedBuilder()
        .setTimestamp()
        .setColor("#030303")
        .setFooter({ text: `System Action` })
        .setAuthor({ name: `${message.author.tag}`, iconURL: `${message.author.avatarURL({ dynamic:true })}`, url: 'https://discord.gg/EU' })
        .addFields([
            { name: `Module`, value: `Ping`, inline: true },
            { name: `Invoker`, value: `<@${message.author.id}>`, inline: true}
        ])
    ACTION_Channel.send({ embeds: [action_msg] })

    let pingMessage = await message.channel.send({ content: "Pong!" });
    
    const ping = pingMessage.createdTimestamp - message.createdTimestamp

    pingMessage.edit({ content: `Pong! \`${ping}ms\`` })
}
module.exports.config = {
    name: "ping",
    category: "admin",
    aliases: ["latency"],
}