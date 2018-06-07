import React, { Component, createRef } from 'react'

export default class Beep extends Component {
    constructor(props) {
        super(props)
        this.beep = createRef()
    }

    componentDidUpdate() {
        const clock = document.querySelector('#logo img')
        if ((this.props.timeLeft * 60) || 60 === this.props.progress) {
            this.beep.current.play()
            clock.className = 'animation'
        }
        if (this.props.progress >= 4)
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
