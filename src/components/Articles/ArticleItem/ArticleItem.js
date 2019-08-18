import React from 'react';
import styles from './articleItem.css';

export default ({ article = {} }) => {
  return (
    <div className={styles.column} key={article.id}>
      <div className={styles.article}>
        {article.getImage('article.featured-image') &&
          <a className={styles.imageLink} href={`/articles/${article.uid}`}>
            <img className={styles.image} src={article.getImage('article.featured-image').url} alt={article.getText('article.header')} />
            <div className={styles.eyesWrapper}>
              <div className={styles.eyes}></div>
            </div>
          </a>
        }

        {article.getText('article.header') &&
          <h3><a className={styles.header} href={`/articles/${article.uid}`}>{article.getText('article.header')}</a></h3>
        }

        {article.getText('article.excerpt') &&
          <p className={styles.excerpt}>{article.getText('article.excerpt')}</p>
        }

        {! article.getText('article.excerpt') && article.getText('article.content') &&
          <p className={styles.excerpt}>
            {article.getText('article.content').substring(122, 0)}
            <a href={`/articles/${article.uid}`}> [...]</a>
          </p>
        }
      </div>
    </div>
  );
}