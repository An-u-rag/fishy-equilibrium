import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import './join.css'


const Join = () => {
    const [name, setName] = useState('')
    //const [room,setRoom] = useState('')

    return (
        <div className="joinOuterContainer">
            <div className="instructions">
                Welcome to Fishy Equilibrium. The game is based on the concept of nash equilibrium. 
                You are a fisherman and you spend an amount of money every day as an investment to seek potential profits after fishing by selling your fish.
                However, this is the midset of many other fishermen as well and the concept of supply and demand comes to play. 
                Simply put, more the overall amount of fish from every fishermen in the market; lower prices per each fish. 
                Similarly, Lesser the overall supply in the market; more expensive an individual fish is.
                Strategize and Collaborate accordingly to make profits every round you play.
                And remember! Festival days are where the spoils are at, in a good way and a bad way. Look at instructions for in-detail meaning.
                <br />
                <ul className="instructionsBox">
                    <h3>Instructions: </h3>
                    <li>The primary objective of the game is to maximize your team's profits throught all the rounds.</li>
                    <li>There are overall 6 rounds played by 4 members/fishermen.</li>
                    <li>Each fisherman can choose catch only either 1 or 2 fish.</li>
                    <li>Depending on the selection of each fisherman, every fisherman gets a profit/loss in every round as "round score".</li>
                    <li>After playing multiple rounds, your overall "Score" will be automatically updated. This is your overall profit or loss.</li>
                    <li>Discussion will be held between every fisherman after round 2 and round 4 to strategize. Either by chat or by video call.</li>
                    <li>The first 4 rounds are normal as per the table provided below.</li>
                    <li>However, the last 2 rounds i.e., Round 5 and 6, your score for that round gets multiplied by a factor of 10</li>
                    <li>Example: If you score 25 point that one round, you get +250 pints instead.</li>
                    <li>Example 2: This goes for loss as well. If you get -25 for that round, -25 * 10 = -250 will be deducted from your overall score</li>
                </ul>

                <table className="instructionsTable" border="1" style={{width: "100%"}}>
                    <tbody>
                    <tr>
                    <th>Total Capture</th>
                    <th colSpan="4" style={{ width: "33.3%"}}>Capture</th>
                    <th colSpan="4" style={{ width: "33.3%"}}>Profit/Loss</th>
                </tr>
                <tr>
                    <td>8</td>
                    <td>2</td>
                    <td>2</td>
                    <td>2</td>
                    <td>2</td>
                    <td>-25</td>
                    <td>-25</td>
                    <td>-25</td>
                    <td>-25</td>
                </tr>
                <tr>
                    <td>7</td>
                    <td>2</td>
                    <td>2</td>
                    <td>2</td>
                    <td>1</td>
                    <td>25</td>
                    <td>25</td>
                    <td>25</td>
                    <td>-25</td>
                </tr>
                <tr>
                    <td>6</td>
                    <td>2</td>
                    <td>2</td>
                    <td>1</td>
                    <td>1</td>
                    <td>50</td>
                    <td>50</td>
                    <td>-12.5</td>
                    <td>-12.5</td>
                </tr>
                <tr>
                    <td>5</td>
                    <td>2</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>75</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                </tr>
                <tr>
                    <td>4</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>25</td>
                    <td>25</td>
                    <td>25</td>
                    <td>25</td>
                </tr>
                    </tbody>
                
                </table>
            </div>
            <div className="joinInnerContainer">
                <h1 className="heading"> Join </h1>

                <div><input placeholder="Nickname..." className="joinInput" type="text" onChange={(event) => setName(event.target.value)} /></div>

                <Link onClick={(event => (!name ? event.preventDefault() : null))} to={`/game?name=${name}`}>
                    <button className="button mt-20" type="submit">Join in</button>
                </Link>

            </div>
        </div>
    )
}

export default Join
