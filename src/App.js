import React from 'react'
import { Routes, Route } from 'react-router-dom'

import './App.scss'
import { Link } from 'react-router-dom'

export default function App() {
    const handleButtonClick = () => {
        window.electron.consoleLog('Button clicked!')
    }

    return (
        <div className="app-container">
            <h1>Electron x React</h1>
            <button onClick={handleButtonClick}>Click me!</button>
            <Routes>
                <Route path="/" element={<h1>Home</h1>} />
                <Route path="a" element={<h1>A</h1>} />
                <Route path="*" element={<h1>An error occurred</h1>} />
            </Routes>
            <div style={{ display: 'flex', columnGap: '1rem' }}>
                <Link to="/">Home</Link>
                <Link to="a">A</Link>
                <Link to="/404">404</Link>
            </div>
        </div>
    )
}
