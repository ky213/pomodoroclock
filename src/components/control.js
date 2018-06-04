import React from 'react'

export default ({data, name, time, increment, decrement }) => {
    return (
        <div className='control-block'>
            <h3 id={name + '-label'} className='title'>{name}</h3>
            <div className='actions'>
                <button
                    id={name + '-decrement'}
                    onClick={() => decrement(data)}
                >-</button>
                <h1 id={name+'-length'}>{time}</h1>
                <button
                    id={name + '-increment'}
                    onClick={() => increment(data)}
                >+</button>
            </div>
        </div>
    )
}
