import styles from './Header.css'

import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'

import { gettext } from '../utils/translation'

export default class Header extends Component {

  static propTypes = {
    children: PropTypes.any
  }

  static contextTypes = {
    store: PropTypes.any
  }

  constructor (props, context) {
    super(props, context)
  }

  render () {
    return (
      <header className={styles.header}>
        <Link className={styles.logo} tabIndex={-1} to='/'>
          <img className={styles.img} src={require('../../assets/images/logo.png')} />
        </Link>

        <h1 className={styles.h1}>{ gettext('Nest') }</h1>

        <nav className={styles.nav}>
          <Link className={styles.menuItem} to='/'>{ gettext('Viewer') }</Link>
        </nav>
      </header>
    )
  }

}
