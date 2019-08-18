import React from 'react';
import Icon from '../Icon/Icon';
import styles from './header.css';
import logo from '../../images/sprite/logo.svg';

export default () => {
  return (
    <div className="container">
      <header className={`${styles.header} header`}>
        { <a className={styles.logo} href="/"><Icon style={{width: '68px', height: '67px'}} icon={logo} /></a> }
      </header>
    </div>
  )
}