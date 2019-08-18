import React from 'react';
import styles from './notfound.css';

export default class Page extends React.Component {

  render() {
    return (
      <div className="container">
        <div className={styles.content}>
          <h3 className={styles.header}>404 - sorry, the page you're looking for isn't here 👻</h3>
          <p>back to <a href="/">homepage?</a></p>
        </div>
      </div>
    );
  }
}
