import React from 'react'

import { BrowserRouter as Router, Route } from 'react-router-dom'

import Join from './components/join/join'
import Game from './components/game/game'


const App = () => {
    const [data, setData] = React.useState(null)

    React.useEffect(() => {
        fetch("/api").then(res => res.json()).then(data => setData(data.message))
    }, [])
    return(
    <Router>
        <code>{!data ? "Not connected to backend" : data}</code>
        <Route path="/" exact component={Join} />
        <Route path="/game" component={Game} />
    </Router>
    )
}

export default App