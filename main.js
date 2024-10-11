const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const path = require('path');

const client = new Client({
    authStrategy: new LocalAuth({
        dataPath: path.resolve(__dirname, 'local_auth')
    })
});


client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('qr', qr => {
    console.log(qr);
    qrcode.generate(qr, { small: true });
});

function getSerializedNumber(number, name) {
    client.getNumberId(number)
        .then(contactId => {
            if (contactId) {
                client.sendMessage(contactId._serialized,
                    `Hello ${name}, this is Wisdom’s WhatsApp API 😊😊😊🔥.`
                );
            } else {
                console.log('No contact found for the given number.');
            }
        })
        .catch(error => {
            console.error('Error fetching contact ID:', error);
        });
}

client.on('message_create', message => {
    if (message.body.toLowerCase().includes('testing')) {
        console.log('message coming in');
        // getSerializedNumber('2348122213918', 'Bukky');
        // console.log('here');

        getSerializedNumber('2349068982486', 'Wisdom');
        // getSerializedNumber('2349083796330', 'Confidence');
    }
});

client.initialize();
