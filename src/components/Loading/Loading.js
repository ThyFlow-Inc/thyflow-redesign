import React from 'react';
import styles from './Loading.css';

export default ({ home = null }) => {
  return (
      <div className={`${styles.container} ${home ? styles.home : ''}`}>
        <div className={styles.circle}></div>
      </div>
    )
}