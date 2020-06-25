/* @jsx jsx */
import React, { FC, memo } from 'react';
 // eslint-disable-next-line 
import { jsx, css } from '@emotion/core';
import { colors } from '.';
import { FaAngleDown } from 'react-icons/fa';

export interface SelectProps
  extends React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {}

export const Select: FC<SelectProps> = memo((props) => {
  return (
    <div css={style}>
      <div> {props.title} </div>
      <div css={style}>
        <select {...props} />
        <FaAngleDown />
      </div>
    </div>
  );
});

Select.displayName = 'Select';

const style = css`
  position: relative;
  height: 2rem;
  display: inline-block;
  margin: 5px 10px 10px 10px;

  > div {
    display: inline-block;
    font-family: Apple SD Gothic Neo;
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    margin-right: 8px;
  }

  > select {
    display: inline-block;
    color: ${colors.brown};
    padding: 0 2rem 0 1rem;
    background-color: ${colors.beige};
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 0.5rem;
    appearance: none;

    font-weight: 800;
    font-family: inherit;
    font-size: 0.75rem;
    line-height: 0.875rem;
    letter-spacing: -0.02em;
    outline: none;
    cursor: pointer;
  }

  > select:hover {
    background: ${colors.yellow};
  }

  > svg {
    color: ${colors.brown};
    font-size: 1rem;
    position: absolute;
    right: 0.5rem;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
  }
`;
