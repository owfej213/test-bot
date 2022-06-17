module.exports = (message) => {
    const message1 = ["幹你娘機掰", "閉嘴", "吵三小", "幫我做直播"]
    const message2 = ["鐵籠戰見", "鐵籠戰等你"]
    const randomMessage1 = message1[Math.random() * message1.length << 0];
    const randomMessage2 = message2[Math.random() * message2.length << 0];
    const { client } = message

    if(message.content.includes('三槍') && message.content.includes('館長')){

        return message.reply({
            content: "<@" + message.author.id + ">" + randomMessage2,
        })
    }

    if(message.content.includes('蹦蹦蹦')) return message.channel.send('我中了兩槍')

    if(message.content.includes(client.config.botId)){
        
        setTimeout(function(){
            message.channel.send("<@" + message.author.id + "> " + randomMessage1)
        },1000 * 5)
    }
}