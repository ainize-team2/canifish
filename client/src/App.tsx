/* @jsx jsx */
import React from 'react';

import Home from './components/home';
import About from './components/about';

 // eslint-disable-next-line 
import { css, jsx } from '@emotion/core';

import { Switch, Route, Redirect } from "react-router-dom";
import "./styles/main.css";
import containerStyle from './styles/containerStyle';

// images
import GitHubIcon from "./images/icon-git-hub.svg";
import AinizeIcon from "./images/icon-ainize.svg";

import analytics from './constants/ga';


function App() {
  const onClickAinizeLink = () => {
    analytics.event({
      category: 'spotainize_common',
      action: 'poweredby_click',
    });
  }

  const onClickGithubLink = () => {
    analytics.event({
      category: 'spotainize_common',
      action: 'github_click',
    });
  }

  return (
    <React.Fragment>
      <header css={containerStyle}>
        <div className="container">
          <a href="/home">
            <h3 className="logo">Can I fish ?</h3>
          </a>
          <div className="menu">
            <a href="/">HOME</a>
            <a href="/about">ABOUT</a>
          </div>
        </div>
      </header>
      <Switch>
        <Route exact path="/about" component={About} />
        <Route exact path="/home" component={Home} />
        <Route path="/">
          <Redirect to="/home" />
        </Route>
      </Switch>
      <footer css={[containerStyle, footerStyle]}>
        <a className="ainizeLink"  onClick={onClickAinizeLink} target="_blank" rel="noopener noreferrer" href="https://www.ainize.ai">
          <img src={AinizeIcon} alt="AinizeIcon"/>
          Powered by Ainize
        </a>
        <a className="githubLink" onClick={onClickGithubLink}  target="_blank" rel="noopener noreferrer" href="https://github.com/ainize-team2/canifish">
          <img src={GitHubIcon} alt="AinizeIcon"/>
          Contribute on GitHub
        </a>
      </footer>
    </React.Fragment>
  );
}
const footerStyle = css`
flex-wrap: wrap;

`;
export default App;
