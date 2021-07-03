import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import { Redirect } from 'react-router-dom'
import io from 'socket.io-client'
import css from './game.css'
import Stats from '../Stats/stats'

import Video from '../Video/video'

let socket

const Game = ({ location }) => {
    const [name, setName] = useState('')
    const [redirect,setRedirect] = useState(false)
    const [player, setPlayer] = useState({})
    const [message,setMessage] = useState('')
    const [messages,setMessages] = useState([])
    const [choice, setChoice] = useState(0)
    const [clientMessage, setclientMessage] = useState('')
    const [PlayerState, setPlayerState] = useState('')
    const [Opp, setOpp] = useState({name:'BOT',state:'Yikers'})
    const [Opps, setOpps] = useState([])
    const [Sync, setSync] = useState('')

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
            setPlayerState('Picking')
            console.log("welcome accessed")
            console.log(Opp)
            console.log(player)
        })

    }, [messages])

    // function to update the player on set interval basis
    useEffect(() => {

        socket.on('updatePlayer', (updatedPlayer) => {
            setPlayer(updatedPlayer)
        })
        
        socket.on('updatePlayerState', (opponent) => {
            if(opponent.name !== player.name){
                setOpp(opponent)
            }
        })
    })

    useEffect(() => {
        let exist = false
        console.log(Opps)
        Opps.forEach(opponent => {
            console.log(opponent.name +":"+Opp.name)
            
            if(opponent.name === Opp.name)
            {
                console.log("Accessed")
                exist = true
            }
        })
        if(exist == false){
            setOpps([...Opps,Opp])
            console.log("exist is false and " + Opp.name + " added")
        } else {
            setOpps(Opps.map((opp) => (opp.id === Opp.id ? Opp : opp )))
            console.log("exist is true and " + Opp.name + " been updated")
            setOpps(Opps.filter(opp => opp.name !== ""))
        }

    },[Opp])

    useEffect(()=>{

        let playerSend = player
        playerSend.name = name
        playerSend.id = player.id
        playerSend.choice = undefined
        playerSend.score = player.score
        playerSend.roundScore =player.roundScore
        playerSend.state = PlayerState

        socket.emit('sendState', playerSend)

        console.log(PlayerState)

        if(Sync === true){
            setSync(false)
            setPlayerState('Picking')
        }

    },[PlayerState, Sync])

    useEffect(() => {

        socket.on('syncPlayers', (msg)=> {
            setSync(true)
            setPlayerState(msg)
            setOpps(Opps.filter(opp => opp.name !== ""))
            setOpps(Opps.filter(opp => opp.name !== "BOT"))
        })

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
        }else if(choice === 2){
            socket.emit('fish2', "2 Fish selected")
        }
        console.log(Opps)

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
            setPlayerState("Submitted")
            document.getElementById('submit').disabled = true
        } else {
            alert("Please select the amount of fish")
        }
        
        
    }

    const sendNext = (event) => {
        console.log("Next round clicked")
        socket.emit('nextRound')
        setPlayerState("Next->")
    }

    if(redirect === true){
        return <Redirect to='/' />
    }

    return (
        <div className="outerContainer">
            <Video />
            <h1>Welcome to Fishy Equilibrium</h1>
            <h2> Hello {name}! </h2>
        
            <Stats player={player} Opps={Opps}/>
            <br/>
            <br />
            <h3>{message}</h3>
            
            <div className="container">

                <div className="buttons">
                    <button onClick={(event => (  player.submit !== true ? setChoice(1) : event.preventDefault()))} >One fish</button>
                    <button onClick={(event => (  player.submit !== true ? setChoice(2) : event.preventDefault()))} >Two fish</button>
                    <br />
                    <button id="submit" onClick={(event => ( choice!=null ? sendSubmit(event) : event.preventDefault() ))} >Submit</button>
                    <br/>
                    <button id="next" hidden onClick={(event => ( player.submit===true ? sendNext(event) : event.preventDefault() ))}>Next Round</button>
                    <br/><br/>
                </div>
                
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