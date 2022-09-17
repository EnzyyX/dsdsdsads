const Discord = require('discord.js');
const { inspect } = require("util");

module.exports.run = async (client, message, args) => {

  if(!client.config.Developer.includes(message.author.id)) return

    let toEval = args.join(" ");
    try {
        if (toEval) {
            let evaluated = inspect(eval(toEval, { depth: 0 }))
            if (evaluated instanceof Promise) evaluated = await evaluated
            let text = Discord.Util.splitMessage(evaluated, {maxLength: 1900})
            let hrStart = process.hrtime()
            let hrDiff;
            hrDiff = process.hrtime(hrStart)

            let x;
            for (x = 0; x < text.length; x++) {
                //if (text[x] === "undefined" || text[x] === "Promise { <pending> }") return;
                message.channel.send(`\`\`\`js\n${text[x]}\n\`\`\``)
            }
        } else {
            const noeval_fail = new Discord.EmbedBuilder()
            .setColor("#030303")
            .setDescription("**Command Failed** - `No Code For Evaluation`")

            message.reply({ embeds: [noeval_fail] })
        }
    } catch (error) {
        const embed = new Discord.EmbedBuilder()

        .setTitle('Command Error')
        .setColor("#030303")
        .setDescription(`\`\`\`${error}\`\`\``)
        .setTimestamp()
    
        message.reply({ embeds: [embed] })   
    }
}

module.exports.config = {
    name: 'eval',
    category: "admin",
    aliases: []
}