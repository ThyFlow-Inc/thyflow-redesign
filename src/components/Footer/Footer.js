import React from 'react';
import styles from './footer.css';

export default ({ page = 'home' }) => {
  return (
    <footer className={`${styles.footer}`}>
      <nav className={styles.nav}>
        <ul>
          <li className={page === 'articles' ? styles.current : ''}><a href="/articles">Articles</a></li>
          <li className={page === 'contact' ? styles.current : ''}><a href="&#109;&#97;&#105;&#108;&#116;&#111;&#58;%6A%65%7A%40%6A%65%7A%66%78%2E%63%6F%6D">Contact</a></li>
          <li className={page === 'privacy' ? styles.current : ''}><a href="/privacy-policy">Privacy</a></li>
        </ul>
      </nav>
    </footer>
  )
}