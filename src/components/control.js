import React from 'react'

export default ({ name, state, increment, decrement }) => {
    return (
        <div className='control-block'>
            <h3 className='title'>{name}</h3>
            <div className='actions'>
                <button 
                onClick={() => decrement(name)} 
                >-</button>
                <h1>{state}</h1>
                <button 
                onClick={() => increment(name)}
                >+</button>
            </div>
        </div>
    )
}
