const Discord = require("discord.js");
const { SlashCommandBuilder } = require("discord.js")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Information on our interaction system.'),

    async execute(interaction, client) {

        const prefixdata = require ('../Schemas/prefix')

        const config = require ('../config.json')

        const data = await prefixdata.findOne({
            GuildID: interaction.guild.id
        })

        const Help_Embed = new Discord.EmbedBuilder()
            .setTitle(`Noble Practice`)
            .setDescription(`> Welcome to the Noble Practice Discord Integration! An advanced multi-purpose functioning system.`)
            .setColor("#030303")
            .addFields(
                {
                    name: `User Assistant`,
                    value: `\`\`\`${data.Prefix}staff\n${data.Prefix}staff\n${data.Prefix}divs\n${data.Prefix}twit\n${data.Prefix}boost\n${data.Prefix}track\n${data.Prefix}r\`\`\``,
                    inline: true
                },
                {
                    name: `Staff Hub`,
                    value: `\`\`\`${data.Prefix}flip\n${data.Prefix}flip\n${data.Prefix}8ball\n${data.Prefix}fact\n${data.Prefix}meme\n${data.Prefix}ping\n${data.Prefix}ascii\`\`\``, inline: true
                },
                {
                    name: `Division 3`,
                    value: `\`\`\`${data.Prefix}qd\n${data.Prefix}qd\n${data.Prefix}li\n${data.Prefix}win\n${data.Prefix}c\`\`\``, inline: true
                },
                {
                    name: `Configuration`,
                    value: `Our system can always change prefixes with the invokion of \`${data.Prefix}prefix [new_prefix]\`.`, inline: false
                }
            )

        const Help_Message = await interaction.reply({ embeds: [Help_Embed], ephemeral: true })
    },
};