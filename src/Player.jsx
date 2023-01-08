import React, { Component } from 'react'

export class Player extends Component {
  render () {
    const pipClass = []
    if (this.props.isPip) {
      pipClass.push('pip')
      if (!this.props.isActive) {
        pipClass.push('invisible')
      }
    }
    return <iframe id={this.props.id} src={this.props.url} className={pipClass.join(' ')} />
  }
}
