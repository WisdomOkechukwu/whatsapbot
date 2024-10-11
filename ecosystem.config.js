module.exports = {
    apps: [{
        name: 'whatsapp-bot',
        script: './server.js',
        // watch: true,
        max_restarts: 5,
        restart_delay: 1000,
        env: {
            NODE_ENV: 'production'
        }
    }]
};