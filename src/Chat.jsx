import React, { Component } from 'react'

export class Chat extends Component {
  render () {
    const isLightTheme = this.props.theme === 'light'
    return (
      <div id='chat' className={this.props.showChat ? '' : 'd-none'}>
        <iframe src={`https://www.twitch.tv/embed/${this.props.host ?? this.props.channel}/chat${isLightTheme ? '?' : '?darkpopout&'}parent=${window.location.hostname}`} />
      </div>
    )
  }
}
