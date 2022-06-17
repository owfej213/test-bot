module.exports = {
    name: 'w',
    expertedArgs: '',
    description: '收到館長的影片',
    permissions: [],
    minArgs: 0,
    
    execute: async (message, argument) => {
        message.author.send('https://www.youtube.com/watch?v=RrAobUAsNkU')
    }
}