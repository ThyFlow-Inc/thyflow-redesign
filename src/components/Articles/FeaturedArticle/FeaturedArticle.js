import React from 'react';
import styles from './featuredarticle.css';

export default ({ article = {}, onClickPost }) => {
  return (
    <div className={styles.article} key={article.id} onClick={() => onClickPost(article.uid)}>

      {article.getImage('article.featured-image') &&
        <a className={styles.imageLink}  style={{backgroundImage: `url(${article.getImage('article.featured-image').url})`}} href={`/articles/${article.uid}`}>
            <div className={styles.eyes}></div>
        </a>
      }

      <div className={styles.content}>
        {article.getText('article.header') &&
          <h3><a className={styles.header} href={`/articles/${article.uid}`}>{article.getText('article.header')}</a></h3>
        }

        {article.getText('article.excerpt') &&
          <p className={styles.excerpt}>{article.getText('article.excerpt')}</p>
        }

        {! article.getText('article.excerpt') && article.getText('article.content') &&
          <p className={styles.excerpt}>
            {article.getText('article.content').substring(200, 0)}
            <a href={`/articles/${article.uid}`}> [...]</a>
          </p>
        }
      </div>

    </div>
  );
}