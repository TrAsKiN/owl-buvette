import React, { Component, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import '../assets/styles/style.scss'

import { Footer } from './Footer'
import { Players } from './Players'
import { Chat } from './Chat'
import { PlayersCommands } from './PlayersCommands'
import { ChatCommands } from './ChatCommands'

import casts from './casts.json'
import themes from './themes.json'

class App extends Component
{
    constructor(props) {
        super(props)
        this.state = {
            casts: casts,
            themes: themes,
            players: [
                {
                    id: 'host',
                    isPip: localStorage.getItem('pip') === 'host' ? true : false,
                    url: `https://player.twitch.tv/?channel=${this.props.channel}&parent=traskin.github.io&parent=localhost`
                },
                {
                    id: 'cast',
                    isPip: localStorage.getItem('pip') !== 'host' ? true : false,
                    url: window.location.hash !== '' ? casts.find(cast => cast.hash === window.location.hash).url : casts.find(cast => cast.disabled !== true).url
                }
            ],
            flipX: localStorage.getItem('flipX') === 'true' ? true : false,
            flipY: localStorage.getItem('flipY') === 'true' ? true : false,
            pipActive: localStorage.getItem('pipActive') === 'false' ? false : true,
            showChat: localStorage.getItem('showChat') === 'false' ? false : true,
            aboveChat: localStorage.getItem('aboveChat') === 'false' ? false : true
        }
    }

    componentDidMount() {
        if (localStorage.getItem('theme')) {
            document.querySelector('body').classList.add('theme-'+ localStorage.getItem('theme').substring(1))
            document.querySelector('#themes .dropdown-item[href="'+ localStorage.getItem('theme') +'"]').classList.add('active')
        } else {
            document.querySelector('body').classList.add('theme-dark')
            document.querySelector('#themes .dropdown-item[href="dark"]').classList.add('active')
        }
        if (window.location.hash) {
            document.querySelector(`#casts .dropdown-item[href="${window.location.hash}"]`).classList.add('active')
        } else {
            document.querySelector(`#casts .dropdown-item:first-child`).classList.add('active')
        }
    }

    handleFlipX() {
        localStorage.setItem('flipX', !this.state.flipX)
        this.setState((state) => ({
            flipX: !state.flipX
        }))
    }

    handleFlipY() {
        localStorage.setItem('flipY', !this.state.flipY)
        this.setState((state) => ({
            flipY: !state.flipY
        }))
    }

    handlePipActive() {
        localStorage.setItem('pipActive', !this.state.pipActive)
        this.setState((state) => ({
            pipActive: !state.pipActive
        }))
    }

    handleAboveChat() {
        if (!this.state.pipActive) {
            this.handlePipActive()
        }
        localStorage.setItem('aboveChat', !this.state.aboveChat)
        this.setState((state) => ({
            aboveChat: !state.aboveChat
        }))
    }

    handleShowChat() {
        if (this.state.aboveChat) {
            this.handleAboveChat()
        }
        localStorage.setItem('showChat', !this.state.showChat)
        this.setState((state) => ({
            showChat: !state.showChat
        }))
    }

    handleSwitchPlayer() {
        localStorage.setItem('pip', this.state.players.find(player => !player.isPip).id)
        this.setState((state) => ({
            players: state.players.map(player => ({
                id: player.id,
                isPip: !player.isPip,
                url: player.url
            }))
        }))
    }

    handleChangeCast(event) {
        if (document.querySelector('#casts .dropdown-item.active')) {
            document.querySelector('#casts .dropdown-item.active').classList.remove('active')
        }
        const newCast = event.target ? event.target.hash : window.location.hash
        document.querySelector('#cast').src = this.state.casts.find(cast => cast.hash === newCast).url
        document.querySelector(`#casts .dropdown-item[href="${newCast}"]`).classList.add('active')
    }

    handleSwitchTheme(event) {
        event.preventDefault()
        if (event.target) {
            if (document.querySelector('#themes .dropdown-item.active')) {
                document.querySelector('#themes .dropdown-item.active').classList.remove('active')
            }
            localStorage.setItem('theme', event.target.hash)
        }
        document.querySelector('body').className = ''
        document.querySelector('body').classList.add('theme-'+ localStorage.getItem('theme').substring(1))
        if (document.querySelector('#themes .dropdown-item[href="'+ localStorage.getItem('theme') +'"]')) {
            document.querySelector('#themes .dropdown-item[href="'+ localStorage.getItem('theme') +'"]').classList.add('active')
        }
    }

    render() {
        if (this.state.aboveChat) {
            document.querySelector('html').classList.add('above')
        } else {
            document.querySelector('html').classList.remove('above')
        }

        if (this.state.showChat) {
            document.querySelector('html').classList.remove('fullscreen')
        } else {
            document.querySelector('html').classList.add('fullscreen')
        }

        return <>
            <div id="app">
                <Players
                    players={this.state.players}
                    flipX={this.state.flipX}
                    flipY={this.state.flipY}
                    pipActive={this.state.pipActive}
                />
                <Chat
                    channel={this.props.channel}
                    showChat={this.state.showChat}
                    aboveChat={this.state.aboveChat}
                />
                <PlayersCommands
                    casts={this.state.casts}
                    themes={this.state.themes}
                    aboveChat={this.state.aboveChat}
                    handleFlipX={this.handleFlipX.bind(this)}
                    handleFlipY={this.handleFlipY.bind(this)}
                    handlePipActive={this.handlePipActive.bind(this)}
                    handleSwitchPlayer={this.handleSwitchPlayer.bind(this)}
                    handleChangeCast={this.handleChangeCast.bind(this)}
                    handleSwitchTheme={this.handleSwitchTheme.bind(this)}
                />
                <ChatCommands
                    showChat={this.state.showChat}
                    aboveChat={this.state.aboveChat}
                    handleAboveChat={this.handleAboveChat.bind(this)}
                    handleShowChat={this.handleShowChat.bind(this)}
                />
            </div>
            <Footer />
        </>
    }
}

const root = createRoot(document.querySelector('body'))
root.render(
    <StrictMode>
        <App channel="fefegg" />
    </StrictMode>
)
