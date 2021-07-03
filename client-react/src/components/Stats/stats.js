import React from 'react'
import style from './stats.css'


const Stats = ({ player, Opps }) => (

        <div className="statsContainer">

            <div className="stats">
                Mystats 
                <div className="mainstats">
                <h2>Your UserID: {player.id} </h2>
                <h2>Score : {player.score}</h2>
                <h2>Round Score : {player.roundScore}</h2>
                <h2>Choice: {player.choice}</h2>
                </div>
            </div>
            
            <div className="stats">
            {Opps[0]? Opps[0].name : null}
                <div className="mainstats">
                {Opps.length > 0 &&  <h2>Score : {Opps[0].score}</h2>}
                <h2>Round Score : {Opps[0]? Opps[0].roundScore : null}</h2>
                <h2>Status : {Opps[0]?Opps[0].state: null}</h2>
                </div>
            </div>
            <div className="stats">
            {Opps[1]? Opps[1].name : null}
                <div className="mainstats">
                {Opps.length > 1 &&  <h2>Score : {Opps[1].score}</h2>}
                <h2>Round Score : {Opps[1]? Opps[1].roundScore : null}</h2>
                <h2>Status : {Opps[1]?Opps[1].state: null}</h2>
                </div>
            </div>
            <div className="stats">
            {Opps[2]? Opps[2].name : null}
                <div className="mainstats">
                {Opps.length > 2 &&  <h2>Score : {Opps[2].score}</h2>}
                <h2>Round Score : {Opps[2]? Opps[2].roundScore : null}</h2>
                <h2>Status : {Opps[2]?Opps[2].state: null}</h2>
                </div>
            </div>
            
        </div>
    )

export default Stats