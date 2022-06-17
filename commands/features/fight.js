const Voice = require('@discordjs/voice')

module.exports = {
    name: 'fight',
    expertedArgs: '',
    description: '進入語音，館長有話要說',
    permissions: [],
    minArgs: 0,
    
    execute: async (message) => {
        const player = Voice.createAudioPlayer()

        player.on('err', (err) => {
            console.log(err)
        })

        if(!message.member.voice.channelId) {
            return message.reply("<@" + message.author.id + "> " + "你給我先進這個伺服器的語音")
        }

        const resurce = Voice.createAudioResource(`${__dirname}/../../sounds/館長.mp3`)

        if(!resurce) return

        player.play(resurce)

        const connect = Voice.joinVoiceChannel({
            channelId: message.member.voice.channel.id,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator,
        })

        const sub = connect.subscribe(player)

        if(sub){
            setTimeout(() => sub.disconnect( ) , 200 * 1000)
        }
    }
}