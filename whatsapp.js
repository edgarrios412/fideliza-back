const qrcode = require('qrcode-terminal');
const { Client, LocalAuth} = require('whatsapp-web.js');
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer:{
        args:['--no-sandbox']
    }
});

client.on('qr', qr => {
    console.log("QR")
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on("authenticated", (e) => {
    console.log(e)
})

client.on("message", (message) => {
    
});


module.exports = {client}