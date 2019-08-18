import React from 'react';
import NotFound from '../NotFound/NotFound';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Loading from '../Loading/Loading';
import ArticleFooter from '../ArticleFooter/ArticleFooter';

import styles from './page.css';

export default class Page extends React.Component {

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
    if (props.prismicCtx) {
      return props.prismicCtx.api.getByUID('page', props.match.params.page, {}, (err, doc) => {
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
        <div data-wio-id={this.state.doc.id} className={`page-${this.props.match.params.page}`}>
          <Header page={this.props.match.params.page} />
            <div className="container">
              <div className={styles.content}>
                <h3 className={styles.header}>{this.state.doc.getText('page.header')}</h3>
                <div dangerouslySetInnerHTML={{ __html: this.state.doc.getStructuredText('page.content').asHtml() }} />
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
