const Discord = require ('discord.js')

module.exports.run = async (client, message, args) => {

    message.delete()

    if(!client.config.Owner.includes(message.author.id) && !message.member.roles.cache.some(r => client.config.StaffHub.includes(r.id))) return

    const Length = args[0]
    const Reason = args.slice(1).join(' ')

    if(!Length) return;
    if(!Reason) return;

    const Log_Channel = message.guild.channels.cache.get('973962073337913404')
    const Code = Math.floor(Math.random() * 6973431) + 1;

    const Log_Embed = new Discord.EmbedBuilder()
        .setColor("#030303")
        .setAuthor({ name: `${message.author.tag}`, iconURL: `${message.member.displayAvatarURL({ dynamic: true })}` })
        .addFields([
            {
                name: `Length`,
                value: `${Length}`
            },
            {
                name: `Reason`,
                value: `${Reason}`, inline: true
            },            {
                name: `Post ID`,
                value: `\`LP-${Code}\``, inline: true
            },
        ])

    Log_Channel.send({embeds: [Log_Embed]})

    const Success_Embed = new Discord.EmbedBuilder()
        .setColor("#030303")
        .setTitle(`Successfully Created`)
        .setDescription(`> Feel free to review all your post details below.`)
        .addFields([
            {
                name: `Post ID`,
                value: `\`LP-${Code}\``, inline: true
            },
            {
                name: `Length`,
                value: `${Length}`, inline: true
            }
        ])

       await message.author.send({embeds: [Success_Embed]});

}
module.exports.config = {
    name: "submit",
    category: "staff",
    aliases: []
}