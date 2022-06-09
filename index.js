const Discord = require('discord.js')
const Voice = require('@discordjs/voice')
const config = require('./config')
const pasta = require('./pasta')
const command = require('./command')
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
    //狀態定時改變
    let counter = 0

    const statusOptions = [
        `鐵籠戰與 ${client.guilds.cache.size} 個伺服器`,
        '-help'
    ]
    const updateStatus = () =>{
        client.user?.setPresence({
            activities:[
                {
                    name : statusOptions[counter]
                }
            ]
        })
        if(++counter >= statusOptions.length){
            counter = 0
        }
        setTimeout(updateStatus, 20 * 1000)
    }
    updateStatus()
    
    //傳送私訊
    privateMessage(client, '-w', 'https://www.youtube.com/watch?v=RrAobUAsNkU')

    //傳送私訊給特定人
    command(client, ['wakeup'], message => {
        const contents = message.content.replace('-wakeup <@', '').replace('>', '')

        if(contents === '803998258396659753') return message.reply('你他媽當我白癡是不是?')

        if(contents.includes('@') || contents.includes('&')) return message.reply('輸入錯誤')

        client.users.fetch(contents).then((user) => {
            user.send(`在**${message.guild.name}**伺服器的**${message.author.username}**提醒你快錯過今天與館長的鐵籠戰了`)
            .catch(error => {
                message.reply(`發送失敗，可能是他封鎖我了`)
            })
        })
    })

    command(client, ['山羌'], message =>{
        message.channel.send(pasta.three_shot)
    })
    //在語音播放mp3
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
            setTimeout(() => sub.unsubscribe(), 200 * 1000)
        }
    })

    command(client, ['help'], message => {
        let Embed = new Discord.MessageEmbed()
        Embed.setTitle(`指令表\n`)
            .addField(`-help`, `顯示指令表`, true)
            .addField(`-w`, `收到館長的影片`, true)
            .addField(`-山羌`, `傳承館長的精神`, true)
            .addField(`-wakeup @某人`, `提醒他鐵籠戰快遲到了`, true)
            .addField(`-fight`, `進入語音，館長有話要說`, true)
            .addField(`-image`, `發送館長圖`, true)
        message.channel.send({
            embeds:[Embed]
        })
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
    if(message.content.includes('<@803998258396659753>')){
        
            setTimeout(function(){
                message.channel.send("<@" + message.author.id + "> " + randomMessage1)
                },1000 * 5)
    }
})
client.login(config.token)
