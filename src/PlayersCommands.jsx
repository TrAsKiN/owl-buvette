import React, { Component } from 'react'

export class PlayersCommands extends Component {
  render () {
    const hidedPipClasses = [
      'btn',
      'btn-sm',
      'btn-link',
      'hide-on-mobile',
      'mx-1',
      this.props.aboveChat ? 'd-none' : ''
    ]
    return (
      <div className='commands text-center'>
        <button onClick={this.props.handleFlipX} type='button' className={hidedPipClasses.join(' ')} data-bs-toggle='tooltip' data-bs-placement='bottom' title='Placer à gauche ou à droite'>
          <i className='bi bi-arrow-left-right' />
        </button>
        <button onClick={this.props.handleFlipY} type='button' className={hidedPipClasses.join(' ')} data-bs-toggle='tooltip' data-bs-placement='bottom' title='Placer en haut ou en bas'>
          <i className='bi bi-arrow-down-up' />
        </button>
        <button onClick={this.props.handlePipActive} type='button' className={hidedPipClasses.join(' ')} data-bs-toggle='tooltip' data-bs-placement='bottom' title='Activer/désactiver le lecteur'>
          <i className='bi bi-eye' />
        </button>
        <button onClick={this.props.handleSwitchPlayer} type='button' className='btn btn-sm btn-link hide-on-mobile mx-1' data-bs-toggle='tooltip' data-bs-placement='bottom' title='Inverser les deux lecteurs'>
          <i className='bi bi-arrow-repeat' />
        </button>
        <div className='btn-group dropup mx-1' data-bs-toggle='tooltip' data-bs-placement='bottom' title='Changer la langue du cast'>
          <button type='button' className='btn btn-sm btn-link dropdown-toggle' data-bs-toggle='dropdown' aria-expanded='false'>
            <i className='bi bi-chat-dots' />
          </button>
          <ul id='casts' className='dropdown-menu'>
            {
              this.props.casts.map((cast, index) => {
                const href = this.props.host ? `${cast.hash}&host=${this.props.host}` : `${cast.hash}`
                return cast.disabled || <li key={index}><a onClick={this.props.handleChangeCast} className='dropdown-item' href={href}>{cast.name}</a></li>
              })
            }
          </ul>
        </div>
        <div className='btn-group dropup mx-1' data-bs-toggle='tooltip' data-bs-placement='bottom' title='Choix du thème'>
          <button type='button' className='btn btn-sm btn-link dropdown-toggle' data-bs-toggle='dropdown' aria-expanded='false'>
            <i className='bi bi-palette' />
          </button>
          <ul id='themes' className='dropdown-menu'>
            {this.props.themes.map((theme, index) => theme.disabled ? null : <li key={index}><a onClick={this.props.handleSwitchTheme} className='dropdown-item' href={theme.hash}>{theme.name}</a></li>)}
          </ul>
        </div>
      </div>
    )
  }
}
