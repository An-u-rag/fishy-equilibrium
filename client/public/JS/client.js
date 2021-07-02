const socket = io('ws://localhost:5000')
let player = {}

socket.on('connect', () => {

    socket.on('updatePlayer', (updatedPlayer) => {
        player = updatedPlayer
    })

    document.getElementById('getid').onclick = () => {
        document.getElementById('username').innerHTML = player.id
        document.getElementById('getid').hidden = true
    }

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
        console.log(player.choice)
        if (player.choice != 0) {
            socket.emit('submit', "Submitted")
            document.getElementById('submit').disabled = true
        } else {
            alert("Please select the amount of fish")
        }

    }

    socket.on('submitconfirm', (msg) => {
        const confirm = document.createElement('li')
        confirm.innerHTML = msg
        document.getElementById('choice').appendChild(confirm)
    })

    socket.on('scores', (players) => {
        var playerList = players
        var score
        var s
        for (i = 0; i < 4; i++) {
            if (playerList[i].id == socket.id.substr(0, 4)) {
                score = playerList[i].score
                s = document.createElement('li')
                s.innerHTML = "<h1> You have scored: " + playerList[i].roundScore + "</h1>"
            }
        }

        document.getElementById('score').innerHTML = score
        document.getElementById('choice').appendChild(s)
        document.getElementById('next').hidden = false
    })

    document.getElementById('next').onclick = () => {
        console.log("Next round clicked")
        socket.emit('nextRound')
    }

    socket.on('resetRound', (players) => {
        document.getElementById('submit').disabled = false

    })

    socket.on('cheat', (msg) => {
        console.log("cheater!")
        alert(msg)
    })

})