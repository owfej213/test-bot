module.exports = {
    name: 'wakeup',
    expertedArgs: '<@某人>',
    description: '@某人，提醒他鐵籠戰快遲到了',
    permissions: [],
    minArgs: 1,
    
    execute: async (message, argument) => {
        const { client } = message
        const botId = client.config.botId
        const contents = argument[0].replace('<@', '').replace('>', '')

        if(contents === botId) return message.reply('你他媽當我白癡是不是?')

        if(contents.includes('@') || contents.includes('&')) return message.reply('輸入錯誤')

        client.users.fetch(contents).then((user) => {
            user.send(`在**${message.guild.name}**伺服器的**${message.author.username}**提醒你快錯過今天與館長的鐵籠戰了`)
            .catch(error => {
                message.reply(`發送失敗，可能是他封鎖我了`)
            })
        })
    }
}