const fs = require('fs')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'help',
    aliases: ['h'],
    expertedArgs: '',
    description: '查看指令表',
    permissions: [],
    minArgs: 0,
    
    execute: async (message) => {
        const prefix = message.client.config.prefix

        const Embeds = new MessageEmbed()
            .setTitle(`指令表`)
        const featureCommands = fs
            .readdirSync(__dirname)
            .filter((file) => file.endsWith('.js'))

        for(const file of featureCommands){
            const command = require(`${__dirname}/${file}`)
            const { name, aliases, description, expertedArgs } = command
            Embeds.addField(
                `**${prefix}${name} ${aliases ? `(${aliases})` : ""} ${expertedArgs}**`,
                `${description}`,
                true
            )
        }
        message.channel.send({
            embeds:[Embeds],
        })
    }
}