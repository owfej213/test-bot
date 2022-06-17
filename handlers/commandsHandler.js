const fs = require('fs')

module.exports = (client, path) => {
    
    const baseFile = 'command-base.js'

    const readCommands = dir => {
        const files = fs.readdirSync(dir)

        for(const file of files){
            const stat = fs.lstatSync(`${dir}/${file}`)
            if(stat.isDirectory()){
                readCommands(`${dir}/${file}`)
            }else if(file != baseFile){
                const command = require(`${dir}/${file}`)
                client.commands.set(command.name, command)
            }
        }
    }
    readCommands(path)
}