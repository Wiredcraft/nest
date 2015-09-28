import styles from './Application.css'

import React, { PropTypes, Component } from 'react'

import Header from './Header'

export default class Application extends Component {

  static propTypes = {
    children: PropTypes.any
  }

  constructor (props, context) {
    super(props, context)
  }

  render () {
    return (
      <div className={styles.app}>
        <Header />

        <section id='main'>
          { this.props.children }
        </section>
      </div>
    )
  }

}
