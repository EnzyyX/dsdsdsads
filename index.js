// ▬▬▬▬▬▬▬▬▬▬ Defining ▬▬▬▬▬▬▬▬▬▬ //

const { Client, Partials, EmbedBuilder, GatewayIntentBits, ActivityType, Collection, PermissionFlagsBits } = require('discord.js');
const { InteractionType, ChannelType } = require("discord-api-types/v10");
const { mongoPath } = require('./config.json')
const mongoose = require ('mongoose')
const config = require('./config.json')
const ascii = require ("ascii-table");
const table = new ascii("Bot Commands")
const fs = require('node:fs');

const bot = new Client({
    intents: [
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildPresences
    ],
    partials: [
        Partials.Channel,
        Partials.GuildMember,
        Partials.Message,
        Partials.Reaction,
        Partials.User
    ] });

module.exports = { bot };

// ▬▬▬▬▬▬▬▬▬▬ Bot ▬▬▬▬▬▬▬▬▬▬ //

bot.config = config
bot.on('ready', (ready) => {
    console.log('Noble Practice Online')
    const total_bot_users = bot.guilds.cache.reduce((a, g) => a + g.memberCount, 0)
    bot.user.setPresence({
        activities: [{ name: `${total_bot_users} Members!`, type: ActivityType.Watching }],
        status: 'dnd',
    });
})

// ▬▬▬▬▬▬▬▬▬▬ Database ▬▬▬▬▬▬▬▬▬▬ //

mongoose.connect(mongoPath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

// ▬▬▬▬▬▬▬▬▬▬ Collections ▬▬▬▬▬▬▬▬▬▬ //

bot.commands = new Collection();
bot.aliases = new Collection();
bot.buttons = new Collection();

// ▬▬▬▬▬▬▬▬▬▬ Handler ▬▬▬▬▬▬▬▬▬▬ //

table.setHeading("Command", "Load Status")

fs.readdirSync("./Commands").forEach(server => {
    fs.readdirSync(`./Commands/${server}`).forEach(dir => {
        let commands = fs.readdirSync(`./Commands/${server}/${dir}/`).filter(file => file.endsWith(".js"));
        for (let file of commands) {
            let pull = require (`./Commands/${server}/${dir}/${file}`);
            if (pull.config.name) {
                table.addRow(file.split(".js")[0], "Ready!");
                bot.commands.set(pull.config.name, pull);
            } else {
                table.addRow(file.split(".js")[0], "Error!");
            }
            if (pull.config.aliases && Array.isArray(pull.config.aliases) && pull.config.aliases.length > 0) {
                pull.config.aliases.forEach(alias => {
                    bot.aliases.set(alias, pull.config.name);
                })
            }
        }
    })
});
console.log(table.toString());


// ▬▬▬▬▬▬▬▬▬▬ Slash ▬▬▬▬▬▬▬▬▬▬ //

let commands = fs.readdirSync(`./SlashCommands/`).filter(file => file.endsWith(".js"));
for (let file of commands) {
    let pull = require (`./SlashCommands/${file}`);
    if (pull.data.name) {
        table.addRow(file.split(".js")[0], "Ready!");
        bot.commands.set(pull.data.name, pull);
    } else {
        table.addRow(file.split(".js")[0], "Error!");
    }
}

// ▬▬▬▬▬▬▬▬▬▬ Message Event ▬▬▬▬▬▬▬▬▬▬ //

bot.on("messageCreate", async msg => {

    const schema = require("./prefix")
    const data = await schema.findOne({ GuildID: msg.guildId })
    let prefix = data && data.Prefix !== undefined ? data.Prefix : config.prefix

    if (msg.author.bot || msg.channel.type === ChannelType.DM || !msg.content.startsWith(prefix)) return;
    let messageArray = msg.content.split(" ");
    let cmd = messageArray[0].toLowerCase();
    let args = messageArray.slice(1);

    let commandfile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)))
    if (commandfile) commandfile.run(bot, msg, args)
})

// ▬▬▬▬▬▬▬▬▬▬ Interaction Event ▬▬▬▬▬▬▬▬▬▬ //

bot.on('interactionCreate', async interaction => {
    if (interaction.type === InteractionType.ApplicationCommand) {

        var command = bot.commands.get(interaction.commandName);
        if (!command) {
            console.error("Interaction not matching: " + interaction.commandName);
            return;
        }

        try {
            await command.execute(interaction);
            console.log(interaction)
        } catch (error) {

            console.error(error);

            const Error_Int_Embed = new EmbedBuilder()
                .setTitle(`Noble Practice Error`)
                .setColor(`#030303`)
                .setDescription(`> There was an error while executing this command, please send this text to [**Enzyy X**](https://discord.gg/jTbrpNXB6k)!\n\`\`\`js\n${error}\`\`\``)

            await interaction.reply({ embeds: [Error_Int_Embed], ephemeral: true });            }
    }
});

// ▬▬▬▬▬▬▬▬▬▬ Custom Events ▬▬▬▬▬▬▬▬▬▬ //

bot.on("interactionCreate", async interaction => {
    if (interaction.isButton()) {

        let channelID;

        if (interaction.guildId === "832996523801182218") { channelID = "833002424947310622" }
    
        if (interaction.channelId !== channelID) return
    
    // ▬▬▬▬▬▬▬▬▬▬ Fortnite ▬▬▬▬▬▬▬▬▬▬ //
    
    if (interaction.customId === 'fn') {

        await interaction.member.roles.add("1020749800079097896")

        await interaction.reply({ content: `> Added <@&1020749800079097896> Role!`, ephemeral: true })

    }

    // ▬▬▬▬▬▬▬▬▬▬ VALORANT ▬▬▬▬▬▬▬▬▬▬ //

    if (interaction.customId === 'val') {
        
        await interaction.member.roles.add("1020749817804234863")

        await interaction.reply({ content: `> Added <@&1020749817804234863> Role!`, ephemeral: true })

    }

    // ▬▬▬▬▬▬▬▬▬▬ WarZone ▬▬▬▬▬▬▬▬▬▬ //
    
    if (interaction.customId === 'wz') {
       
        await interaction.member.roles.add("1020749832073252934")

        await interaction.reply({ content: `> Added <@&1020749832073252934> Role!`, ephemeral: true })

    }
    
    }
})

bot.login(config.token).then(r => console.log(`Logged onto the Account.`))