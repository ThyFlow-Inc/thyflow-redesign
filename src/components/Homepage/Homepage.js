import React from "react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import Isvg from "react-inlinesvg";

import NotFound from "../NotFound/NotFound";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Loading from "../Loading/Loading";
import Signup from "../Signup/Signup";

import styles from "./homepage.css";
import isometric from "./isometric.svg";
import ba from "./ooo.svg";

export default class Homepage extends React.Component {
  state = {
    doc: null,
    notFound: false
  };

  componentWillMount() {
    this.fetchPage(this.props);
  }

  componentWillReceiveProps(props) {
    this.fetchPage(props);
  }

  fetchPage(props) {
    if (props.prismicCtx) {
      return props.prismicCtx.api.getByUID(
        "homepage",
        "home",
        {},
        (err, doc) => {
          if (doc) {
            this.setState({ doc });
          } else {
            this.setState({ notFound: !doc });
          }
        }
      );
    }
    return null;
  }

  render() {
    if (this.state.doc) {
      return (
        <div className={`homepage`}>
          <CSSTransitionGroup
            transitionName="fade"
            transitionAppear
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
            transitionAppearTimeout={500}
          >
            <Header />
            <div className={styles.home} data-wio-id={this.state.doc.id}>
              <div className={`${styles.homeContainer} container`}>
                <div className={styles.text}>
                  <h1 className={styles.heading}>Welcome to ThyFlow</h1>
                  <h2 className={styles.subheading}>
                    We are building a trusted platform for anyone to find
                    verified Mobile Service providers in their local area and
                    book an appointment. We connect service providers with
                    customers that need and want their service, in a safe and
                    secure manner.
                  </h2>
                  <Signup />
                </div>

                <div className={styles.image}>
                  <Isvg src={ba} />
                </div>

                <div className={styles.footer}>
                  <Footer />
                </div>
              </div>
            </div>
          </CSSTransitionGroup>
        </div>
      );
    } else if (this.state.notFound) {
      return <NotFound />;
    }
    return <Loading home />;
  }
}
