import React from 'react'
import architect from './architect.svg'
import "./underConstruction.css"

function underConstruction() {
    return (
        <div className="underConstruction">
            <img src={architect} alt="" className="underConstruction-image"/>
            <h1>Under Construction</h1>
        </div>
    )
}

export default underConstruction
