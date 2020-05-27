/* @jsx jsx */
 // eslint-disable-next-line 
import React, { useState, Suspense } from 'react';
import FishListContainer from './components/fish/FishListContainer';
 // eslint-disable-next-line 
import { css, jsx } from '@emotion/core';
 // eslint-disable-next-line 
import { colors, Select } from './ui';
 // eslint-disable-next-line 
import text from './constants/text';

const style = css`
  background: ${colors.appBgColor};
  padding: 2rem 0;
  min-height: 100%;

  h1 {
    margin: 0 0 1em;
    text-align: center;
    color: ${colors.brown};
  }
`;

function App() {
  return (
    <main css={style}>
      <h1>Can I Fish?</h1>

      <Suspense fallback="Loading...">
        <FishListContainer />
      </Suspense>
    </main>
  );
}

export default App;
