import React from 'react';

import NotFound from '../../components/NotFound/NotFound';
import Header from '../../components/Header/Header';
import Loading from '../../components/Loading/Loading';
import ArticleFooter from '../../components/ArticleFooter/ArticleFooter';

import styles from './singleArticle.css';

export default class SingleArticle extends React.Component {

  state = {
    doc: null,
    notFound: false,
  }

  componentWillMount() {
    this.fetchPage(this.props);
  }

  componentWillReceiveProps(props) {
    this.fetchPage(props);
  }

  fetchPage(props) {
    if (props.prismicCtx && typeof props.match.params.article !== 'undefined') {
      return props.prismicCtx.api.getByUID('article', props.match.params.article, {}, (err, doc) => {
        if (doc) {
          this.setState({ doc });
        } else {
          this.setState({ notFound: !doc });
        }
      });
    }
    return null;
  }

  render() {
    if (this.state.doc) {
      return (
        <div data-wio-id={this.state.doc.id} className={`page-articles`}>
          <Header page="page-articles" />

              <div className={styles.content}>
                <div className={styles.article} key={this.state.doc.id}>
                  {this.state.doc.getImage('article.featured-image') &&
                    <img className={styles.image} src={this.state.doc.getImage('article.featured-image').url} alt={this.state.doc.getText('article.header')} />
                  }

                  {this.state.doc.getText('article.header') &&
                    <h3 className={styles.header}>{this.state.doc.getText('article.header')}</h3>
                  }

                  {this.state.doc.getText('article.content') &&
                    <div className={styles.post} dangerouslySetInnerHTML={{ __html: this.state.doc.getStructuredText('article.content').asHtml() }} />
                  }
                </div>
              </div>

              <ArticleFooter {...this.props} />

        </div>
      );
    } else if (this.state.notFound) {
      return <NotFound />;
    }
    return <Loading />;
  }
}
