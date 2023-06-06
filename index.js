const { Client, Events, GatewayIntentBits} = require('discord.js');
const { token } = require('./config.json');
const axios = require('axios');

const client = new Client({ intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages
]});

client.once(Events.ClientReady, c => {
    console.log(`${c.user.tag}が起動しました`)
})

client.on(Events.MessageCreate, message => {
    if (message.author.bot) return;
    if (message.content.includes('こんにちは')) {
        message.reply(`${message.author.username}さんこんにちは～`);
    }

    if (message.content === 'cat') {    
        axios.get('https://api.thecatapi.com/v1/images/search')
        .then((response) => {
            message.channel.send({files:[response.data[0].url]})
        })
        .catch((error) => {
            console.log(error);
        })
    }

    if (message.content === 'dog') {    
        axios.get('https://api.thedogapi.com/v1/images/search')
        .then((response) => {
            message.channel.send({files:[response.data[0].url]})
        })
        .catch((error) => {
            console.log(error);
        })
    }
})

client.login(token);