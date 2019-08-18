import React from 'react';
import Prismic from 'prismic.io';

import NotFound from '../../components/NotFound/NotFound';
import Header from '../../components/Header/Header';
import Loading from '../../components/Loading/Loading';
import Signup from '../../components/Signup/Signup';

import ArticleItem from '../../components/Articles/ArticleItem/ArticleItem';
import FeaturedArticle from '../../components/Articles/FeaturedArticle/FeaturedArticle';


import styles from './articles.css';

export default class Articles extends React.Component {

  constructor() {
    super();

    this.state = {
      articles: null,
      doc: null,
      featured: null,
      notFound: false,
      page: 1,

    }

    this.nextPage = this.nextPage.bind(this);
    this.onClickPost = this.onClickPost.bind(this);
  }

  componentWillMount() {
    this.fetchPage(this.props);
    this.fetchArticles(this.props);
    this.fetchFeatured(this.props);
  }

  componentWillReceiveProps(props) {
    this.fetchPage(props);
    this.fetchArticles(props);
    this.fetchFeatured(props);
  }

  fetchPage(props) {
    if (props.prismicCtx) {
      return props.prismicCtx.api.getByUID('article-page', 'article-page', {}, (err, doc) => {
        if (doc) {
          this.setState({ doc });
        } else {
          this.setState({ notFound: !doc });
        }
      });
    }
    return null;
  }

  fetchFeatured(props) {
    if (props.prismicCtx) {
      return props.prismicCtx.api.query(
          Prismic.Predicates.at('my.article.featured', 'yes'), { pageSize : 1}
      ).then((featured) =>  {
        if (featured.total_pages !== 0) {
          if (!this.state.featured) {
            this.setState({ featured });
          }
        }
      });
    }
  }

  fetchArticles(props) {
    if (props.prismicCtx) {
      return props.prismicCtx.api.query(
          Prismic.Predicates.at('document.type', 'article'), { pageSize : 3, page: this.state.page }
      ).then((articles) =>  {
        if (articles.total_pages !== 0) {
          if (!this.state.articles) {
            this.setState({ articles });
          } else {
            const nextArticles = {...this.state.articles};
            nextArticles.results.push(...articles.results);
            this.setState({ articles: nextArticles });
          }
        }
      });
    }
  }

  nextPage() {
    const page = this.state.page + 1;
    this.setState({ page }, () => this.fetchArticles(this.props));
  }

  onClickPost(id) {
    this.props.history.push(`/articles/${id}`);
  }

  render() {
    if (this.state.doc) {
      return (
        <div data-wio-id={this.state.doc.id} className={`page-articles`}>
          <Header page="page-articles" />
            <div className="container">
              <div className="content">

                <div className={styles.hero}>
                  <h1 className={styles.heading}>{this.state.doc.getText('article-page.header')}</h1>
                  <h2 className={styles.subheading}>{this.state.doc.getText('article-page.sub-header')}</h2>
                  <div className={styles.signup}>
                    <Signup />
                  </div>
                </div>

                {this.state.articles && this.state.articles.total_pages !== 0 &&
                  <div className={styles.articles}>
                    <div className={`${styles.featured}`}>
                      { this.state.articles.results.map((article) => {
                        if (article.getImage('article.featured-image')) {
                          return <FeaturedArticle key={article.id} onClickPost={this.onClickPost} article={article} />
                        }
                      })}
                    </div>
                  </div>
                }
                <div className={styles.loadMore}>
                  {this.state.articles && this.state.page > this.state.articles.total_pages
                    ? <span>That's all for now folks 😁</span>
                    : <button className="button" onClick={() => this.nextPage()}>next page</button>
                  }
                </div>
              </div>
            </div>
        </div>
      );
    } else if (this.state.notFound) {
      return <NotFound />;
    }
    return <Loading />;
  }
}
