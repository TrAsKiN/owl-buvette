import React, { Component } from 'react'

export class Players extends Component {
  render () {
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

    return (
      <div id='players' className={pipClass.join(' ')}>
        {this.props.children}
      </div>
    )
  }
}
