import React, { Component, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import '../assets/styles/style.scss'

import { Footer } from './Footer'
import { Players } from './Players'
import { Player } from './Player'
import { Chat } from './Chat'
import { PlayersCommands } from './PlayersCommands'
import { ChatCommands } from './ChatCommands'
import { ErrorBoundary } from './ErrorBoundary'

import casts from './casts.json'
import themes from './themes.json'

class App extends Component {
  constructor (props) {
    super(props)
    const host = document.location.hash.match(/host=(\w+)/)?.slice(1)
    const castHash = document.location.hash.match(/#(\w+)/)?.slice(1)[0]
    this.state = {
      casts,
      themes,
      host: host,
      players: [
        {
          id: 'host',
          isPip: localStorage.getItem('pip') === 'host',
          url: `https://player.twitch.tv/?channel=${host ?? this.props.channel}&parent=traskin.github.io&parent=localhost`
        },
        {
          id: 'cast',
          isPip: localStorage.getItem('pip') !== 'host',
          url: castHash ? casts.find(cast => cast.hash === `#${castHash}`).url : casts.find(cast => cast.disabled !== true).url
        }
      ],
      flipX: localStorage.getItem('flipX') === 'true',
      flipY: localStorage.getItem('flipY') === 'true',
      pipActive: localStorage.getItem('pipActive') !== 'false',
      showChat: localStorage.getItem('showChat') !== 'false',
      aboveChat: localStorage.getItem('aboveChat') !== 'false'
    }
  }

  componentDidMount () {
    if (localStorage.getItem('theme')) {
      document.querySelector('body')?.classList.add('theme-' + localStorage.getItem('theme').substring(1))
      document.querySelector('#themes .dropdown-item[href="' + localStorage.getItem('theme') + '"]')?.classList.add('active')
    } else {
      document.querySelector('body')?.classList.add('theme-dark')
      document.querySelector('#themes .dropdown-item[href="dark"]')?.classList.add('active')
    }
    if (window.location.hash) {
      document.querySelector(`#casts .dropdown-item[href="${window.location.hash}"]`)?.classList.add('active')
    } else {
      document.querySelector('#casts .dropdown-item:first-child')?.classList.add('active')
    }
  }

  applyAnimation () {
    const pip = document.querySelector('.pip')
    pip?.classList.add('animate')
    const listener = () => {
      pip?.classList.remove('animate')
      pip.removeEventListener('animationend', listener)
    }
    pip.addEventListener('animationend', listener)
  }

  handleFlipX () {
    this.applyAnimation()
    localStorage.setItem('flipX', !this.state.flipX)
    this.setState((state) => ({
      flipX: !state.flipX
    }))
  }

  handleFlipY () {
    this.applyAnimation()
    localStorage.setItem('flipY', !this.state.flipY)
    this.setState((state) => ({
      flipY: !state.flipY
    }))
  }

  handlePipActive () {
    if (this.state.aboveChat) {
      this.handleAboveChat()
    }
    localStorage.setItem('pipActive', !this.state.pipActive)
    this.setState((state) => ({
      pipActive: !state.pipActive
    }))
  }

  handleAboveChat () {
    if (!this.state.pipActive) {
      this.handlePipActive()
    }
    localStorage.setItem('aboveChat', !this.state.aboveChat)
    this.setState((state) => ({
      aboveChat: !state.aboveChat
    }))
  }

  handleShowChat () {
    if (this.state.aboveChat) {
      this.handleAboveChat()
    }
    localStorage.setItem('showChat', !this.state.showChat)
    this.setState((state) => ({
      showChat: !state.showChat
    }))
  }

  handleSwitchPlayer () {
    localStorage.setItem('pip', this.state.players.find(player => !player.isPip).id)
    this.setState((state) => ({
      players: state.players.map(player => ({
        id: player.id,
        isPip: !player.isPip,
        url: player.url
      }))
    }))
  }

  handleChangeCast (event) {
    if (document.querySelector('#casts .dropdown-item.active')) {
      document.querySelector('#casts .dropdown-item.active')?.classList.remove('active')
    }
    const newCast = event.target ? event.target.hash : window.location.hash
    document.querySelector('#cast').src = this.state.casts.find(cast => cast.hash === newCast).url
    document.querySelector(`#casts .dropdown-item[href="${newCast}"]`)?.classList.add('active')
  }

  handleSwitchTheme (event) {
    event.preventDefault()
    if (event.target) {
      if (document.querySelector('#themes .dropdown-item.active')) {
        document.querySelector('#themes .dropdown-item.active')?.classList.remove('active')
      }
      localStorage.setItem('theme', event.target.hash)
    }
    document.querySelector('body').className = ''
    document.querySelector('body')?.classList.add('theme-' + localStorage.getItem('theme').substring(1))
    if (document.querySelector('#themes .dropdown-item[href="' + localStorage.getItem('theme') + '"]')) {
      document.querySelector('#themes .dropdown-item[href="' + localStorage.getItem('theme') + '"]')?.classList.add('active')
    }
  }

  render () {
    if (this.state.aboveChat) {
      document.querySelector('html')?.classList.add('above')
    } else {
      document.querySelector('html')?.classList.remove('above')
    }

    if (this.state.showChat) {
      document.querySelector('html')?.classList.remove('fullscreen')
    } else {
      document.querySelector('html')?.classList.add('fullscreen')
    }

    return (
      <>
        <div id='app'>
          <Players
            flipX={this.state.flipX}
            flipY={this.state.flipY}
          >
            {this.state.players.map(player =>
              <Player key={player.id} id={player.id} url={player.url} isPip={player.isPip} isActive={this.state.pipActive} />
            )}
          </Players>
          <Chat
            host={this.state.host}
            channel={this.props.channel}
            showChat={this.state.showChat}
            aboveChat={this.state.aboveChat}
          />
          <PlayersCommands
            host={this.state.host}
            aboveChat={this.state.aboveChat}
            casts={this.state.casts}
            handleChangeCast={this.handleChangeCast.bind(this)}
            themes={this.state.themes}
            handleSwitchTheme={this.handleSwitchTheme.bind(this)}
            handleFlipX={this.handleFlipX.bind(this)}
            handleFlipY={this.handleFlipY.bind(this)}
            handlePipActive={this.handlePipActive.bind(this)}
            handleSwitchPlayer={this.handleSwitchPlayer.bind(this)}
          />
          <ChatCommands
            showChat={this.state.showChat}
            handleShowChat={this.handleShowChat.bind(this)}
            aboveChat={this.state.aboveChat}
            handleAboveChat={this.handleAboveChat.bind(this)}
            pipActive={this.state.pipActive}
            handlePipActive={this.handlePipActive.bind(this)}
          />
        </div>
        <Footer />
      </>
    )
  }
}

const root = createRoot(document.querySelector('body'))
root.render(
  <StrictMode>
    <ErrorBoundary>
      <App channel='fefegg' />
    </ErrorBoundary>
  </StrictMode>
)
