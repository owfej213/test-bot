const Discord = require('discord.js')
const Voice = require('@discordjs/voice')
const config = require('./config.json')
const pasta = require('./pasta.json')
const command = require('./command')
const fs = require('fs')
const privateMessage = require('./private-message')
const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_VOICE_STATES"
    ]
})

client.on('ready', () => {
    console.log('The bot is ready')

    setInterval (function () {
        client.user.setActivity(`鐵籠戰與 ${client.guilds.cache.size} 個伺服器`)
      }, 10 * 1000)
    //傳送私訊
    privateMessage(client, '-w', 'https://www.youtube.com/watch?v=RrAobUAsNkU')

    //傳送私訊給特定人
    command(client, ['wakeup'], message => {
        const contents = message.content.replace('-wakeup <@', '').replace('>', '')

        if(contents === '803998258396659753') return message.reply('你他媽當我白癡是不是?')

        if(contents.includes('@')) return message.reply('你他媽輸入錯了')

        if(message.member.permissions.has('ADMINISTRATOR')){
            client.users.fetch(contents).then((user) => {
                user.send('你快錯過今天的鐵籠戰了')
              })
        }else{
            message.reply('你要有管理員權限')
        }
    })

    command(client, ['山羌'], message =>{
        message.channel.send(pasta.three_shot)
    })

    command(client, ['fight'], message =>{

        const player = Voice.createAudioPlayer()

        player.on('err', (err) => {
            console.log(err)
        })

        if(!message.member.voice.channelId) {
            return message.reply("<@" + message.author.id + "> " + "他媽的你給我先進這個伺服器的語音")
        }

        const resurce = Voice.createAudioResource('./sounds/館長.mp3')

        player.play(resurce)

        const connect = Voice.joinVoiceChannel({
            channelId: message.member.voice.channel.id,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator,
        })

        const sub = connect.subscribe(player)

        if(sub){
            if(message.content.includes('蹦蹦蹦')){

                return message.channel.send('我中了兩槍')
            }
        }
    })
})

client.on('messageCreate', (message) => {

    const message1 = ["幹你娘機掰", "閉嘴", "吵三小", "幫我做直播"]
    const message2 = ["鐵籠戰見", "鐵籠戰等你"]
    const randomMessage1 = message1[Math.floor(Math.random() * message1.length)];
    const randomMessage2 = message2[Math.floor(Math.random() * message2.length)];
    var randomMessage = Math.floor(Math.random() * 100);

    if(message.author.id === '803998258396659753') return

    if(message.content.includes('三槍') && message.content.includes('館長')){

        return message.reply({
            content: "<@" + message.author.id + ">" + randomMessage2,
        })
    }

    if(message.content.includes('蹦蹦蹦')){

        return message.channel.send('我中了兩槍')
    }
    if(randomMessage > 95){
        
            setTimeout(function(){
                message.channel.send("<@" + message.author.id + "> " + randomMessage1)
                },1000 * 5)
    }
})
client.login(config.token)
