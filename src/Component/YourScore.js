import React from 'react'

export default function YourScore(props) {
    return (
        <div className='scoreClass'>
            <div className='scoreInner'>
                <div className='scorePrint'>Your Score is :- {props.score} </div>
                <button className='scoreCloseBtn' onClick={props.close}>X</button>
            </div>
        </div>
    )
}
