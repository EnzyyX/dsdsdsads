// ▬▬▬▬▬▬▬▬▬▬ Defining ▬▬▬▬▬▬▬▬▬▬ //

const Discord = require('discord.js')
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const { token } = require('./config.json');
const fs = require('fs');
const { bot } = require('./index.js');
const ascii = require("ascii-table");

// ▬▬▬▬▬▬▬▬▬▬ Collections ▬▬▬▬▬▬▬▬▬▬ //

const commands = [];
const commandFiles = fs.readdirSync('./SlashCommands').filter(file => file.endsWith('.js'));

// ▬▬▬▬▬▬▬▬▬▬ IDs ▬▬▬▬▬▬▬▬▬▬ //

const clientId = '966419246382977085';
const guildId = '1020324051329237014';

// ▬▬▬▬▬▬▬▬▬▬ Handling ▬▬▬▬▬▬▬▬▬▬ //

for (const file of commandFiles) {
    const command = require(`./SlashCommands/${file}`);
    commands.push(command.data.toJSON());
}
console.log(commands);

// ▬▬▬▬▬▬▬▬▬▬ API + Registration ▬▬▬▬▬▬▬▬▬▬ //

const rest = new REST({ version: '10' }).setToken(token);

rest.put(Routes.applicationGuildCommands( clientId, guildId ), { body: commands })
    .then(() => console.log('Successfully registered template.'))
    .catch(console.error);