import React from 'react';
import Signup from '../../components/Signup/Signup';
import styles from './articleFooter.css';

export default class ArticleFooter extends React.Component {

  state = {
    footer: null,
  }

  componentWillMount() {
    this.fetchFooter(this.props);
  }

  componentWillReceiveProps(props) {
    this.fetchFooter(props);
  }


  fetchFooter(props) {
    if (props.prismicCtx) {
      return props.prismicCtx.api.getByUID('article-footer', 'article-footer', {}, (err, footer) => {
        if (footer) {
          this.setState({ footer });
        }
      });
    }
  }

  render() {
    return (
      <div>
        {this.state.footer &&
          <div className={styles.footer}>
            <div className={styles.content}>
              {this.state.footer.getText('article-footer.header') &&
                <h3 className={styles.footerHeader}>{this.state.footer.getText('article-footer.header')}</h3>
              }
              {this.state.footer.getText('article-footer.copy') &&
                <p className={styles.footerCopy}>{this.state.footer.getText('article-footer.copy')}</p>
              }

              <div className={styles.footerSignup}>
                <Signup />
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}
