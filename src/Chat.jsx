import React, { Component } from 'react'

export class Chat extends Component
{
    render() {
        return <div id="chat" className={this.props.showChat ? '' : 'd-none'}>
            <iframe src={`https://www.twitch.tv/embed/${this.props.channel}/chat?darkpopout&parent=traskin.github.io&parent=localhost`}></iframe>
        </div>
    }
}
