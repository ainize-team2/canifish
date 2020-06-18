
[![Run on Ainize](https://www.ainize.ai/static/images/run_on_ainize_button.svg)](https://ainize.web.app/redirect?git_repo=github.com/ainize-team2/canifish)

<img src=/images/animal_crossing.jpg width="1000px" height="400px">


This project is a fish book to help you find fish information in Animal Crossing Game.

# How to Run

## Local
```
yarn
yarn run client-build
yarn start
```

## Docker
```
sudo docker build -t {Docker Path}:{Tag} .
sudo docker run -p {Expose Port}:80 {Docker Path}:{Tag}
```

- Install docker [link](https://blog.cosmosfarm.com/archives/248/%EC%9A%B0%EB%B6%84%ED%88%AC-18-04-%EB%8F%84%EC%BB%A4-docker-%EC%84%A4%EC%B9%98-%EB%B0%A9%EB%B2%95/)

# Todo
Current The project contains only fish information. So, our goal is that the project will be a site that you can see all kinds of information in Animal Crossing Game.
1. We have to design with the Animal Crossing Book, not the fish Book. (design.fig)
2. We have to add an insect book [link](https://docs.google.com/spreadsheets/u/1/d/1oJGO78ou4hJFj2gBYSo-WFaKmaUmItTSlh3AuTxBewc/htmlview?usp=sharing#')
