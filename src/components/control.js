import React from 'react'

export default ({ name, state, increment, decrement }) => {
    return (
        <div className='control-block'>
            <h3 id={name + '-label'} className='title'>{name}</h3>
            <div className='actions'>
                <button
                    id={name + '-decrement'}
                    onClick={() => decrement(name)}
                >-</button>
                <h1 id={name+'-length'}>{state}</h1>
                <button
                    id={name + '-increment'}
                    onClick={() => increment(name)}
                >+</button>
            </div>
        </div>
    )
}
