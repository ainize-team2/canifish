/* @jsx jsx */
import React, { FC, memo } from 'react';
 // eslint-disable-next-line 
import { jsx, css } from '@emotion/core';
import { colors } from '.';
import { FaSearch } from 'react-icons/fa';

export interface SearchProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

export const Search: FC<SearchProps> = memo((props) => {
  return (
    <div css={style}>
      <FaSearch />
      <input {...props} />
    </div>
  );
});

Search.displayName = 'Search';

const style = css`
  position: relative;
  height: 2rem;
  display: inline-block;
  margin: 10px;


  > input {
    color: ${colors.brown};
    padding: 0 1rem 0 2rem;
    background-color: ${colors.beige};
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 8px;
    appearance: none;

    font-weight: 800;
    font-family: inherit;
    font-size: 0.75rem;
    line-height: 0.875rem;
    letter-spacing: -0.02em;
    outline: none;
  }

  > input:active {
    border: 1px solid #B492FC;
    box-sizing: border-box;
  }

  > input:hover {
    border: 1px solid #B492FC;
    box-sizing: border-box;
  }
  > input::placeholder {
    color: #9C9386;
  }

  > svg {
    color: ${colors.brown};
    font-size: 1rem;
    position: absolute;
    left: 0.5rem;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
  }
`;
