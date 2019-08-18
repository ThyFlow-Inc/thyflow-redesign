import React, { Component } from "react";
import { CSSTransitionGroup } from "react-transition-group";

import $ from "jquery";
import styles from "./signup.css";

//https://stackoverflow.com/questions/8425701/ajax-mailchimp-signup-form-integration

export default class Signup extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      message: ""
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    const email = encodeURIComponent(this.refs.email.value);

    if (email.length > 0) {
      $.ajax({
        type: "post",
        url:
          "//gmail.us3.list-manage.com/subscribe/post-json?u=bec60926eacfcba24724e4020&amp;id=5a83436bcb&c=?",
        data: `EMAIL=${email}&b_5f2dbc1b0d115f0f15a3e8823_663da05343=`,
        cache: false,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        error: function(err) {
          alert(
            "Could not connect to the registration server. Please try again later."
          );
        },
        success: data => {
          if (data.result !== "success") {
            // Something went wrong, do something to notify the user. maybe alert(data.msg);
            this.setState({ message: data.msg });
          } else {
            // It worked, carry on...
            this.setState({
              message: "thanks, We will reach out to you soonest! 😁"
            });
          }
        }
      });
    } else {
      this.setState({ message: "Oops, please fill in your email." });
    }
  }

  render() {
    return (
      <div className={styles.signup} style={{ ...this.props.inlineStyles }}>
        <div id="mc_embed_signup">
          <form
            onSubmit={this.handleSubmit}
            action="//gmail.us3.list-manage.com/subscribe/post?u=bec60926eacfcba24724e4020&amp;id=5a83436bcb&c=?"
            method="post"
            id="mc-embedded-subscribe-form"
            name="mc-embedded-subscribe-form"
            className="validate"
            target="_blank"
          >
            <div id="mc_embed_signup_scroll">
              <div className="mc-field-group">
                <input
                  placeholder="your email"
                  ref="email"
                  type="email"
                  name="EMAIL"
                  className={`required email ${styles.email}`}
                  id="mce-EMAIL"
                />
              </div>
              <div id="mce-responses" className="clear">
                <div
                  className="response"
                  id="mce-error-response"
                  style={{ display: "none" }}
                />
                <div
                  className="response"
                  id="mce-success-response"
                  style={{ display: "none" }}
                />
              </div>
              <div style={{ position: "absolute", left: "-5000px" }}>
                <input
                  type="text"
                  name="b_5f2dbc1b0d115f0f15a3e8823_663da05343"
                />
              </div>
              <div className="clear">
                <input
                  type="submit"
                  value="Subscribe"
                  name="subscribe"
                  id="mc-embedded-subscribe"
                  className={`${styles.button} button`}
                />
              </div>
              <div className={styles.confirmation}>
                <CSSTransitionGroup
                  transitionName="message"
                  transitionEnterTimeout={500}
                  transitionLeaveTimeout={300}
                >
                  {this.state.message.length > 0 && (
                    <p
                      className={styles.confirmationMessage}
                      dangerouslySetInnerHTML={{
                        __html: this.state.message
                      }}
                    />
                  )}
                </CSSTransitionGroup>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
