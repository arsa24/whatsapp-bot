module.exports = {
    apps: [{
        name: "whatsapp-bot",
        script: "./main.js",
        watch: true,
        ignore_watch: ["database.json", "node_modules", "state"],
        cron_restart: "*/30 * * * *"
    }]
};