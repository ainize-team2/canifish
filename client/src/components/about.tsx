import React, { FC, useEffect } from 'react';
import { Button } from '../ui';
import ProfileImage from "../images/profile.svg";
import analytics from '../constants/ga';
import GitHubIcon from "../images/icon-github-white.svg";
import AinizeIcon from "../images/icon-ainize-white.svg";
import StackoverflowIcon from "../images/icon-stackoverflow.svg";


import "../styles/about.css";

const About: FC = () => {
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

  const onClickStackink = () => {
    analytics.event({
      category: 'spotainize_common',
      action: 'stackoverflow_click',
    });
  }
  
  useEffect(() => {
    analytics.ga("send", "pageview", "/about");
  }, []);
  return (
    <main>
      <div className="about_hero section">
        <div className="container">
          <div className="content">
            <h1>
              Join Project Reinvent <br />
              to improve Can I Fish
            </h1>
            <h4>
              Project Reinvent is an initiative to bring new life to forgotten open-source projects.
              We added more features and the English version.
              We’re looking forward to having more contributions from global fans of Animal Crossing!
            </h4>
            <a target="_blank" onClick={onClickGithubLink} rel="noopener noreferrer" href="https://github.com/ainize-team2/canifish">
              <Button ><img className="svg" src={GitHubIcon} alt="GitHubIcon" />Github repo</Button>
            </a>
          </div>
          <div className="content quote box">
            <h3>
              “Seeing a new version of my project, developed further by someone else 
              was such a unique experience."
            </h3>
            <h4 style={{lineHeight: '28px'}}>iamchanii, open-source developer & author of Can I Fish</h4>
            <img src={ProfileImage} alt="ProfileImage"/>
          </div>
        </div>
      </div>
      <div className="about section">
        <div className="container">
          <div className="content">
            <h2>What is Can I fish?</h2>
            <h4 style={{lineHeight: '28px'}}>
              Can I Fish is a complete guidebook for fish collectors of Animal Crossing.
              It simply allows you to easily find types of fish that you can catch today. Also,
              you can search by name and price of fish.
              Can I Fish was developed to help users to access information without spending time on communities. 
            </h4>
            <h4 style={{lineHeight: '28px'}}>
              The original version of Can I Fish project {" "}
              <a href="https://github.com/iamchanii/canifish" rel="noopener noreferrer" target="_blank">
                Github repo
              </a>{" "}
              by iamchanii. Can I Fish website design is done by {" "}
              <a href="https://www.behance.net/adorable_jin" rel="noopener noreferrer" target="_blank">
                adorable_jin. 
              </a>
            </h4>
          </div>
        </div>
      </div>
      <div className="ainize section">
        <div className="container">
          <div className="content">
            <h2>What is Ainize</h2>
            <h4 style={{lineHeight: '28px'}}>
              Ainize is a serverless cloud platform that helps developers to
              transform open-source projects into live services. To encourage
              the creation of innovative projects, deploying public Github
              repositories is free at Ainize. If your repo has a Dockerfile,
              you're just one click away from free deployments!
            </h4>
            <div className="link ainizeIcon">
              <a target="_blank" rel="noopener noreferrer" href="https://ainize.ai">
                <Button onClick={onClickAinizeLink} style={{ marginBottom: '10px' }}><img className="svg" src={AinizeIcon} alt="AinizeIcon" /> Visit Ainize Website</Button>
              </a>
            </div>
            <div className="link stackIcon">
              <a target="_blank" rel="noopener noreferrer" href="https://stackoverflow.com/questions/tagged/ainize">
                <Button onClick={onClickStackink} ><img className="svg" src={StackoverflowIcon} alt="StackOverflow" />Ask on Stack Overflow</Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}


About.displayName = 'About';

export default About;