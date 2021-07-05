import React from 'react'
import css from './chat.css'

const Chat = ({clientMessages}) => {
    return (
        <div className="outerChatContainer">
            <h1>Chat Box</h1>
            <ul className="listContainer">
                {clientMessages.length>0 ? clientMessages.map(function(d, idx){
                    if(d.user){
                        
                        return (<li key={idx}>{d.user} : {d.text}</li>)
                    }
                }): null}
            </ul>
        </div>
    )
}

export default Chat
