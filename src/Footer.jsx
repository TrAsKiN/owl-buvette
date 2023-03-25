import React, { Component } from 'react'
import { Octokit } from '@octokit/rest'
import { Popover } from 'bootstrap/dist/js/bootstrap'
import Package from '../package.json'

export class Footer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      version: `v${Package.version}`,
      upToDate: false
    }
  }

  componentDidMount () {
    (new Octokit()).repos
      .getLatestRelease({
        owner: 'TrAsKiN',
        repo: 'owl-buvette'
      })
      .then(({ data }) => {
        if (data.tag_name > this.state.version) {
          console.warn(`Your app version is not up-to-date!`)
          this.setState({upToDate: false})
        }
      })

    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
    popoverTriggerList.forEach(popoverTriggerEl => new Popover(popoverTriggerEl, {
      html: true,
      container: 'body'
    }))
  }

  render () {
    return (
      <footer className='text-center'>
        <p className='mt-1 mb-0 pb-2'>
          <small>
            <>UI by <a href='https://twitter.com/notTrAsKiN' target='_blank' rel='noreferrer'>TrAsKiN</a></>
            <> &middot; </>
            <>Sources on <a href='https://github.com/TrAsKiN/owl-buvette' target='_blank' rel='noreferrer'>GitHub</a></>
            <> &middot; </>
            <span id='version' className='position-relative'>{this.state.upToDate || <i className='bi bi-exclamation text-warning text-opacity-50 position-absolute start-0 translate-middle' style={{top: 30+'%'}}></i>}{this.state.version}</span>
            <> &middot; </>
            <a href='https://github.com/TrAsKiN/owl-buvette/issues/new' target='_blank' rel='noreferrer'>Report a bug</a>
            <> &middot; </>
            <a
              tabIndex='0' className='text-decoration-none badge rounded-pill text-bg-info text-dark' role='button'
              data-bs-toggle='popover' data-bs-trigger='focus' data-bs-content='<a href="https://www.youtube.com/account_sharing" target="_blank" class="text-dark text-decoration-none fw-bold">Lié son compte Battle.net à YouTube</a><br><a href="https://account.battle.net/connections#connected-accounts" target="_blank" class="text-dark text-decoration-none fw-bold">Lié son compte Battle.net à Twitch</a>'
            >
              Drops?
            </a>
          </small>
        </p>
      </footer>
    )
  }
}
