const Discord = require ('discord.js')

module.exports.run = async (bot, message, args) => {

    if(!bot.config.Owner.includes(message.author.id) && !message.member.roles.cache.some(r => bot.config.StaffHub.includes(r.id))) return

    if (!args[0]) {

        return message.reply('Please ask me a question.');

        } else {

            await message.channel.sendTyping();
            let eightball = [
                'It is certain.',
                'It is decidedly so.',
                'Without a doubt.',
                'Yes, definitely.',
                'You may rely on it.',
                'As I see it, yes.',
                'Most likely.',
                'Outlook good.',
                'Yes.',
                'Signs point to yes.',
                'Reply hazy try again.',
                'Ask again later.',
                'Better not tell you now.',
                'Cannot predict now.',
                'Concentrate and ask again.',
                'Don\'t count on it.',
                'My reply is no.',
                'My sources say no.',
                'Outlook not so good.',
                'Very doubtful.',
                'No way.',
                'Maybe',
                'The answer is hiding inside you',
                'No.',
                'Depends on the mood of the CS god',
                '||No||',
                '||Yes||',
                'Hang on',
                'It\'s over',
                'It\'s just the beginning',
                'Good Luck',
            ];

            let index = (Math.floor(Math.random() * Math.floor(eightball.length)));

            const Answer_Embed = new Discord.EmbedBuilder()
                .setColor("#030303")
                .setAuthor({name: `My Answer`, iconURL: `${message.author.avatarURL({ dynamic: true })}`})
                .setDescription(`> ${eightball[index]}`)

            setTimeout(() => {
                message.reply({embeds: [Answer_Embed]});
            }, 550);

        }
}
module.exports.config = {
    name: '8ball',
    description: 'A magic 8ball command 🎱',
    usage: '[question]',
}