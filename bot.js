// bot.js
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const path = require('path');

// Create a WhatsApp client
const client = new Client({
    authStrategy: new LocalAuth({
        dataPath: path.resolve(__dirname, 'local_auth')
    }),
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    }
});

// Event to handle QR code generation
client.on('qr', (qr) => {
    console.log('Scan this QR code to authenticate:');
    qrcode.generate(qr, { small: true });
});

// Event to notify when the client is ready
client.on('ready', () => {
    console.log('WhatsApp client is ready!');
});

// Function to send a message
async function sendMessage(number, message) {
    try {
        const contactId = await client.getNumberId(number);
        // console.log(contactId);
        if (contactId) {
            await client.sendMessage(contactId._serialized, message);
            console.log(`Message sent to ${number}`);
        } else {
            console.log('Number not found on WhatsApp');
        }
    } catch (error) {
        console.error('Error sending message:', error);
    }
}

// Initialize the client
client.initialize();

module.exports = { sendMessage };
