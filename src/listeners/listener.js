//Listeners are added here
module.exports = {
    message: [
        require('./digest')
    ],
    guildMemberAdd: [
        require('./welcome')
    ]
}