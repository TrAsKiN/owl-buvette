import React, { Component } from 'react'

export class ChatCommands extends Component {
  render () {
    const hidePipClasses = [
      'btn',
      'btn-sm',
      'btn-link',
      'hide-on-mobile',
      'mx-1',
      this.props.pipActive && this.props.aboveChat && this.props.showChat ? '' : 'd-none'
    ]
    const abovePipClasses = [
      'btn',
      'btn-sm',
      'btn-link',
      'hide-on-mobile',
      'mx-1',
      this.props.showChat ? '' : 'd-none'
    ]
    return (
      <div className='commands text-center hide-on-mobile'>
        <button onClick={this.props.handlePipActive} type='button' className={hidePipClasses.join(' ')} data-bs-toggle='tooltip' data-bs-placement='bottom' title='Masquer le lecteur'>
          <i className='bi bi-eye-slash' />
        </button>
        <button onClick={this.props.handleAboveChat} type='button' className={abovePipClasses.join(' ')} data-bs-toggle='tooltip' data-bs-placement='bottom' title='Placer/enlever au-dessus du chat'>
          {this.props.aboveChat ? <i className='bi bi-box-arrow-left' /> : <i className='bi bi-box-arrow-in-right' />}
        </button>
        <button onClick={this.props.handleShowChat} type='button' className='btn btn-sm btn-link mx-1' data-bs-toggle='tooltip' data-bs-placement='bottom' title='Basculer le chat'>
          {this.props.showChat ? <i className='bi bi-arrow-bar-right' /> : <i className='bi bi-arrow-bar-left' />}
        </button>
      </div>
    )
  }
}
