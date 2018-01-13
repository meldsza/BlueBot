const bot = require('./bot.js');
const listeners = require('./listeners/listener');

//Hook listeners

Object.keys(listeners).map(event => {
    listeners[event].map((func, i) => {
        if (!func) return;
        if (typeof func != "function")
            return console.log(event + "[" + i + "] is not a function and hence was not added");
        bot.on(event, func)
    });
})

bot.on('ready', () => {
    console.log("Bot Ready");
});