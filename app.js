console.log('Fishy Equilibrium')

const express = require('express')
const app = express()

const http = require('http')
const server = http.createServer(app)

const io = require('socket.io')(server, {
    cors: { origin: "*" }
})

const path = require('path')

app.use(express.static(__dirname + '/client/public'));

const PORT = 5000;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/index.html'))
})


server.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})

let players = []
let submitCount = 0
io.on('connection', (socket) => {
    let player = {
        id: "",
        score: 0,
        choice: 0,
    }
    player.id = socket.id.substr(0, 4)
    player.score = 0

    console.log("User connected with socket id: " + player.id);

    socket.on('fish1', (message) => {
        console.log(`User with socket id: ${player.id} has selected 1 Fish`)
        player.choice = 1
        console.log(player)
        if (containsObject(player, players)) {
            console.log(`Changing answer to 1 for ${player.id}`)
        } else {
            players.push(player)
        }
        console.log(players)
        console.log("//////////////////////////////////////////////////////////////////////////////")
    })

    socket.on('fish2', (message) => {
        console.log(`User with socket id: ${player.id} has selected 2 Fish`)
        player.choice = 2
        console.log(player)
        if (containsObject(player, players)) {
            console.log(`Changing answer to 2 for ${player.id}`)
        } else {
            players.push(player)
        }
        console.log(players)
        console.log("//////////////////////////////////////////////////////////////////////////////")
    })

    socket.on('submit', () => {
        socket.broadcast.to(socket.id).emit('submitstop', "stop")
        submitCount++
        if (submitCount == 4) {
            io.emit('submitconfirm', "Everyone has submitted, processing results...")
            let choiceList = players.map((p) => {
                return p.choice
            })
            let countoftwo = 0
            for (i = 0; i < choiceList.length; i++) {
                console.log(choiceList[i])
                if (choiceList[i] == 2) {
                    countoftwo = countoftwo + 1
                }
            }
            console.log("count of two: " + countoftwo)
            switch (countoftwo) {
                case 0:
                    players.forEach(p => p.score = p.score + 25)
                    console.log("accesed 1111")
                    break;
                case 1:
                    players.forEach(p => p.choice == 1 ? p.score = p.score + 0 : p.score = p.score + 75)
                    console.log("accesed 2111")
                    break;
                case 2:
                    players.forEach(p => p.choice == 1 ? p.score = p.score - 12.5 : p.score = p.score + 50)
                    console.log("accesed 2211")
                    break;
                case 3:
                    players.forEach(p => p.choice == 1 ? p.score = p.score - 25 : p.score = p.score + 25)
                    console.log("accesed 2221")
                    break;
                case 4:
                    players.forEach(p => p.score = p.score - 25)
                    console.log("accesed 2222")
                    break;
            }

            io.emit('scores', players)
            players.forEach(p => console.log(p.id + " chose: " + p.choice + " ; and has score of " + p.score))
        }
    })

    socket.on('disconnect', () => {
        console.log(`User with socket id ${player.id} has disconnected`)
    })

})

function containsObject(obj, list) {
    var x;
    for (x in list) {
        if (list[x] === obj) {
            return true;
        }
    }
    return false;
}