const { MessageAttachment } = require('discord.js')
const fs = require('fs')

var images = []

module.exports = {
    name: 'image',
    expertedArgs: '',
    description: '發送館長圖',
    permissions: [],
    minArgs: 0,
    
    execute: async (message, argument) => {
        
        if(images.length){
            const RandomImage = images[Math.random() * images.length << 0].replace('\\', '/')
            const Attachment = new MessageAttachment( RandomImage )
            return message.channel.send({files: [ Attachment ]})
        }
        const join = require('path').join
        const path = `${__dirname}/../../pic`
        const image = fs.readdirSync(path)
        image.forEach(function (item, index) {
            let fPath = join(path,item)
                images.push(fPath)
        }).catch(error => {
            return console.log(error)
        })
        const RandomImage = images[Math.random() * images.length << 0].replace('\\', '/')
        const Attachment = new MessageAttachment( RandomImage )
        return message.channel.send({files: [ Attachment ]})
    }
}