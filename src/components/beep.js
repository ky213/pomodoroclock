import React, { Component, createRef } from 'react'

export default class Beep extends Component {
    constructor(props) {
        super(props)
        this.beep = createRef()
    }

    componentDidUpdate({ progress }, state) {
        const clock = document.querySelector('#logo img')
        if (progress == 100) {
            this.beep.current.play()
            clock.className = 'animation'
        }
        if (progress == 5)
            clock.className = ''

    }
    render() {
        return (
            <div>
                <audio
                    id='beep'
                    src='./beep.wav'
                    ref={this.beep}
                    volume='0.2'
                ></audio>
            </div>
        )
    }
}
