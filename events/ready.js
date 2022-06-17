module.exports = {
    name:'ready',
    once: true,

    async execute(client) {
        console.log(`Log in as ${client.user.username}!`)

        let counter = 0

        const statusOptions = [
            `鐵籠戰與 ${client.guilds.cache.size} 個伺服器`,
            '-help'
        ]
        const updateStatus = () =>{
            client.user?.setPresence({
                activities:[
                    {
                        name: statusOptions[counter]
                    }
                ]
            })
            if(++counter >= statusOptions.length){
                counter = 0
            }
            setTimeout(updateStatus, 20 * 1000)
        }
        updateStatus()
    }
}