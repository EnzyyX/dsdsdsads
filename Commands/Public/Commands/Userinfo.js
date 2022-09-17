const Discord = require ('discord.js')
const moment = require ('moment')

module.exports.run = async (bot, message, args) => {

    if(!bot.config.Owner.includes(message.author.id) && !message.member.roles.cache.some(r => bot.config.StaffHub.includes(r.id))) return

    let userArray = message.content.split(" ");
    let userArgs = userArray.slice(1);
    let member = message.mentions.members.first() || message.guild.members.cache.get(userArgs[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === userArgs.slice(0).join(" ") || x.user.username === userArgs[0]) || message.member;
    const memberPermissions = member.permissions.toArray();

    let x = Date.now() - member.createdAt;
    let y = Date.now() - message.guild.members.cache.get(member.id).joinedAt;
    const joined = Math.floor(y / 86400000);

    const joineddate = moment.utc(member.joinedAt).format("dddd, MMMM Do YYYY, HH:mm:ss");

    const userEmbed = new Discord.EmbedBuilder()
    .setAuthor({ name: `${message.author.tag}`, iconURL: `${message.author.displayAvatarURL({ dynamic: true, size: 512 })}`, url: `https://discord.gg/EU` })
    .setTimestamp()
    .setColor("#030303")
    .setThumbnail(member.user.displayAvatarURL(({ dynamic: true })))
    .setDescription(`<@${member.id}> • ${member.id}`)
    .addFields([
        {
            name: '**Joined**',
            value: `${joineddate}`, inline: true
        },
        {
            name: '**Registered**',
            value: `${moment.utc(member.user.createdAt).format("dddd, MMMM Do YYYY")}`, inline: true},
        {
            name: '**Roles**',
            value: `<@&${member._roles.join('> <@&')}>` },
        {
            name: '**Key Permissions**',
            value: `${memberPermissions}` },
    ])
   // .addField("Status", status)

    message.channel.send({ embeds: [userEmbed] });

}

module.exports.config = {
    name: "whois",
    category: "scrims",
    description: "Shows the information of a member/user",
    aliases: ['userinfo', "ws"]
}