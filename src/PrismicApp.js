import React from 'react';
import 'whatwg-fetch';
import Prismic from 'prismic.io';
import PrismicConfig from './prismic-configuration';
import App from './App';

export default class PrismicApp extends React.Component {

  state = {
    prismicCtx: null,
  }

  componentWillMount() {
    this.buildContext().then((prismicCtx) => {
      this.setState({ prismicCtx });
    }).catch((e) => {
      console.error(`Cannot contact the API, check your prismic configuration:\n${e}`);
    });
  }

  buildContext() {
    const accessToken = PrismicConfig.accessToken;
    return Prismic.api(PrismicConfig.apiEndpoint, { accessToken }).then(api => ({
      api,
      endpoint: PrismicConfig.apiEndpoint,
      accessToken,
      linkResolver: PrismicConfig.linkResolver,
    }));
  }

  render() {
    return <App prismicCtx={this.state.prismicCtx} />;
  }
}
