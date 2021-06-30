const socket = io('ws://localhost:5000')

socket.on('connect', () => {
    let choice = true

    document.getElementById('fish1').onclick = () => {
        socket.emit('fish1', "1 Fish selected")
        let choice = "You selected 1 Fish";
        const msg = document.createElement('li')
        msg.innerHTML = choice
        document.getElementById('choice').appendChild(msg)
        choice = true
    }

    document.getElementById('fish2').onclick = () => {

        socket.emit('fish2', "2 Fish selected")
        let choice = "You selected 2 Fish";
        const msg = document.createElement('li')
        msg.innerHTML = choice
        document.getElementById('choice').appendChild(msg)
        choice = true
    }

    document.getElementById('submit').onclick = () => {
        if (choice == true) {
            socket.emit('submit', "Submitted")
            document.getElementById('submit').disabled = true
        }

    }

    socket.on('submitconfirm', (msg) => {
        const confirm = document.createElement('li')
        confirm.innerHTML = msg
        document.getElementById('choice').appendChild(confirm)
    })

    socket.on('scores', (players) => {
        console.log(players)
        var playerList = players
        console.log(playerList[0])
        var score
        for (i = 0; i < 4; i++) {
            console.log(playerList[i].id)
            console.log("socket id: " + socket.id.substr(0, 4))
            if (playerList[i].id == socket.id.substr(0, 4)) {
                score = playerList[i].score
                console.log("accessed")
            }
        }
        const s = document.createElement('li')
        s.innerHTML = "<h1> You have scored: " + score + "</h1>"
        document.getElementById('choice').appendChild(s)
    })
})