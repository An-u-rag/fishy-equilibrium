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

let _gameState = {
    players: [],
    submitCount: 0,
    submit: false,
    nextRoundCount: 0,
    round: 0
}


io.on('connection', (socket) => {
    let player = {
        id: "",
        score: 0,
        choice: 0,
        roundScore: 0,
        submit: false,
        nextRound: false
    }
    player.id = socket.id.substr(0, 4)
    _gameState.players.push(player)

    setInterval(() => {

        io.to(socket.id).emit('updatePlayer', player)

    }, 1)


    console.log("User connected with socket id: " + player.id);

    socket.on('fish1', (message) => {
        console.log(`User with socket id: ${player.id} has selected 1 Fish`)
        player.choice = 1
        if (containsObject(player, _gameState.players)) {
            console.log(`Changing answer to 1 for ${player.id}`)
        } else {
            _gameState.players.push(player)
        }
        console.log("//////////////////////////////////////////////////////////////////////////////")
    })

    socket.on('fish2', (message) => {
        console.log(`User with socket id: ${player.id} has selected 2 Fish`)
        player.choice = 2
        if (containsObject(player, _gameState.players)) {
            console.log(`Changing answer to 2 for ${player.id}`)
        } else {
            _gameState.players.push(player)
        }
        console.log("//////////////////////////////////////////////////////////////////////////////")
    })

    socket.on('submit', () => {
        if (player.submit == false) {
            player.submit = true
            _gameState.submitCount++
        } else {
            console.log(player.id + " is breaking the rules")
            io.to(socket.id).emit('cheat', "Please don't try to edit the HTML or you will be disqualified!")
        }

        socket.broadcast.to(socket.id).emit('submitstop', "stop")

        if (_gameState.submitCount == 4) {
            io.emit('submitconfirm', "Everyone has submitted, processing results...")
            choiceList = _gameState.players.map((p) => {
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
                    _gameState.players.forEach(p => {
                        p.score = p.score + 25;
                        p.roundScore = 25
                    })
                    console.log("accesed 1111")
                    break;
                case 1:
                    _gameState.players.forEach(p => p.choice == 1 ? (p.score = p.score + 0, p.roundScore = 0) : (p.score = p.score + 75, p.roundScore = 75))
                    console.log("accesed 2111")
                    break;
                case 2:
                    _gameState.players.forEach(p => p.choice == 1 ? (p.score = p.score - 12.5, p.roundScore = -12.5) : (p.score = p.score + 50, p.roundScore = 50))
                    console.log("accesed 2211")
                    break;
                case 3:
                    _gameState.players.forEach(p => p.choice == 1 ? (p.score = p.score - 25, p.roundScore = -25) : (p.score = p.score + 25, p.roundScore = 25))
                    console.log("accesed 2221")
                    break;
                case 4:
                    _gameState.players.forEach(p => {
                        p.score = p.score - 25;
                        p.roundScore = -25
                    })
                    console.log("accesed 2222")
                    break;
            }

            io.emit('scores', _gameState.players)
            _gameState.players.forEach(p => console.log(p.id + " chose: " + p.choice + " ; and has score of " + p.score, p.nextRound = false))
            _gameState.nextRoundCount = 0
            _gameState.submitCount = 0
        }
    })


    socket.on('nextRound', () => {
        if (player.nextRound == false && _gameState.nextRoundCount != 4) {
            _gameState.nextRoundCount++
                player.nextRound = true
            console.log(_gameState.nextRoundCount)
        }
        if (_gameState.nextRoundCount === 4) {
            console.log("2 " + _gameState.nextRoundCount)
            _gameState.round++
                _gameState.nextRoundCount = -1
            _gameState.players.forEach(p => {
                p.submit = false
                p.choice = 0
                p.nextRound = false
            })
            io.emit('resetRound', _gameState.players)
        }
    })

    socket.on('disconnect', () => {
        for (var i = 0; i < _gameState.players.length; i++) {
            if (_gameState.players[i].id === player.id) {
                _gameState.players.splice(i, 1)
            }
        }
        console.log(`User with socket id ${player.id} has disconnected`)
        console.log(_gameState.players)
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