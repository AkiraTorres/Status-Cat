const TelegramBot = require("node-telegram-bot-api");
const statusCode = require("./statusCode.json");
require("dotenv").config({path: __dirname + '/.env'});

const TOKEN = process.env.API_KEY;
const Cats = "https://http.cat/"
const bot = new TelegramBot(TOKEN, {polling: false});

bot.on("new_chat_members", (msg) => {
    bot.sendMessage(
        msg.chat.id, 
        `Olá ${msg.from.first_name}, digite /help para ter acesso a uma lista de comandos.`);
});

bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id;
    const response = `Comandos do bot:\n/echo [argumento]: Irá enviar uma mensagem repetindo o argumento enviado.
/http [code]: Envia uma imagem e um leve resumo do código HTTP passado como argumento.`;
''
    bot.sendMessage(chatId, response);
});

bot.onText(/\/echo (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const response = match[1];

    bot.sendMessage(chatId, response);
});

bot.onText(/\/http (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const http = match[1];
    const url = Cats + match[1];
    const caption = `Code ${statusCode[http].code} - ${statusCode[http].phrase}:\n${statusCode[http].description}`;

    bot.sendPhoto(chatId, url, {caption: caption});
});