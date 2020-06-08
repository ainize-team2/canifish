/* @jsx jsx */
import React from 'react';

import FishListContainer from './components/fish/FishListContainer';
import About from './components/about';

 // eslint-disable-next-line 
import { css, jsx } from '@emotion/core';

import { Switch, Route, Redirect } from "react-router-dom";
import "./styles/main.css";
import containerStyle from './styles/containerStyle';

// images
import GitHubIcon from "./images/icon-git-hub.svg";
import AinizeIcon from "./images/icon-ainize.svg";



function App() {
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
        <Route exact path="/FishListContainer" component={FishListContainer} />
        <Route path="/">
          <Redirect to="/FishListContainer" />
        </Route>
      </Switch>
      <footer css={containerStyle}>
        <a className="ainizeLink"  target="_blank" rel="noopener noreferrer" href="https://www.ainize.ai/ehdgus8077/canifish">
          <img src={AinizeIcon} alt="AinizeIcon"/>
          Powered by Ainize
        </a>
        <a className="githubLink" target="_blank" rel="noopener noreferrer" href="https://github.com/ainize-team2/canifish">
          <img src={GitHubIcon} alt="AinizeIcon"/>
          Contribute on GitHub
        </a>
      </footer>
    </React.Fragment>
  );
}

export default App;
