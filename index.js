const { Client, Collection } = require('discord.js')
const handleEvents = require("./handlers/eventsHandler")
const handleCommands = require('./handlers/commandsHandler')
const config = require('./config.json')


const client = new Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_VOICE_STATES",
        "GUILD_MEMBERS"
    ]
})
client.commands = new Collection();
client.config = config
handleEvents(client, `${__dirname}/events`)
handleCommands(client, `${__dirname}/commands`)

client.login(config.token)