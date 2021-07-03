import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import { Redirect } from 'react-router-dom'
import io from 'socket.io-client'

let socket

const Game = ({ location }) => {
    const [name, setName] = useState('')
    const [redirect,setRedirect] = useState(false)
    const [player, setPlayer] = useState({})
    const [message,setMessage] = useState('')
    const [messages,setMessages] = useState([])
    const [choice, setChoice] = useState(0)
    const [clientMessage, setclientMessage] = useState('')

    const ENDPOINT = 'ws://localhost:5000'

    // effect to join a game with a name
    useEffect(() => {
        const name = queryString.parse(location.search).name

        socket = io(ENDPOINT)

        setName(name)
        player.name = name

        socket.emit('join', name, (error) => {
            alert(error)
            setRedirect(true)
        })

        return () => {
            socket.disconnect()
            socket.off()
        }
    }, [ENDPOINT, location.search])

    useEffect(() => {

        socket.on('receiveMessage', (msg) => {
            setclientMessage(msg)
        })

    }, []) 

    // effect to receive a welcome message
    useEffect(() => {
        socket.on('welcome', (msg) => {
            setMessages([...messages, msg])
        })

    }, [messages])

    // function to update the player on set interval basis
    useEffect(() => {

        socket.on('updatePlayer', (updatedPlayer) => {
            setPlayer(updatedPlayer)
        }) 

    })

    useEffect(() => {

        socket.on('cheat', (msg) => {
            console.log("cheater!")
            alert(msg)
        })  

        socket.on('error' , (msg) => {
            alert(msg)
            setRedirect(true)
        })

        socket.on('submitconfirm', (msg) => {
            setMessage(msg)
        })

        socket.on('resetRound', (players) => {
            document.getElementById('submit').disabled = false
            setChoice(0)
            setMessage('')
        })

        socket.on('scores', (players) => {
            var playerList = players
            
            document.getElementById('next').hidden = false
        })

    },[])

    useEffect(() => {
        if(choice === 1){
            socket.emit('fish1', "1 Fish selected")
            console.log("Submit status: " + player.submit)
        }else if(choice === 2){
            socket.emit('fish2', "2 Fish selected")
            console.log("Submit status: " + player.submit)
        }
    }, [choice])

    //function to send message
    const sendMessage = (event) => {
        event.preventDefault()

        if(message) {
            socket.emit('sendMessage', message, (text) => {
                setMessages([...messages, text])
                setMessage('')
            })
        }

    }

    // function for submit onclick event.
    const sendSubmit = (event) => {

        if (player.choice !== 0) {
            socket.emit('submit', "Submitted")
            document.getElementById('submit').disabled = true
        } else {
            alert("Please select the amount of fish")
        }
        
        
    }

    const sendNext = (event) => {
        console.log("Next round clicked")
        socket.emit('nextRound')
    }

    if(redirect === true){
        return <Redirect to='/' />
    }

    return (
        <div className="outerContainer">
            <h1>Welcome to Fishy Equilibrium</h1>
            <h2> Hello {name}! </h2>
            <h4>Your UserID: {player.id} </h4>
            <h1>Score : {player.score}</h1>
            <h3>Round Score : {player.roundScore}</h3>
            <h2>Choice: {player.choice}</h2>
            <br/>
            <h3>{message}</h3>
            <div className="container">

                
                <button onClick={(event => (  player.submit !== true ? setChoice(1) : event.preventDefault()))} >One fish</button>
                <button onClick={(event => (  player.submit !== true ? setChoice(2) : event.preventDefault()))} >Two fish</button>
                <br />
                <button id="submit" onClick={(event => ( choice!=null ? sendSubmit(event) : event.preventDefault() ))} >Submit</button>
                <br/>
                <button id="next" hidden onClick={(event => ( player.submit===true ? sendNext(event) : event.preventDefault() ))}>Next Round</button>
                <br/><br/>
                <div>
                    <h1>Chat Box</h1>
                    <ul>
                        <li>
                            {clientMessage}
                        </li>
                    </ul>
                </div>
                

                <input value={message} onChange={(event) => setMessage(event.target.value)} onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}/>
                
            </div>
        </div>
    )
}


export default Game