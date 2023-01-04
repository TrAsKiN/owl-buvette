import React, { Component } from 'react'

import { Player } from './Player'

export class Players extends Component
{
    render() {
        const pipClass = []

        if (this.props.flipX) {
            pipClass.push('pip-left')
        } else {
            pipClass.push('pip-right')
        }

        if (this.props.flipY) {
            pipClass.push('pip-top')
        } else {
            pipClass.push('pip-bottom')
        }

        return <div id="players" className={pipClass.join(' ')}>
            {this.props.players.map(player =>
                <Player id={player.id} url={player.url} isPip={player.isPip} isActive={this.props.pipActive} flipX={this.props.flipX} flipY={this.props.flipY} />
            )}
        </div>
    }
}
