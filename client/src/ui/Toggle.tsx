/** @jsx jsx */
import { jsx, css } from '@emotion/core';
 // eslint-disable-next-line 
import type, { FC, ButtonHTMLAttributes } from 'react';
import colors from './colors';

const style = css`
  /** 버튼 모양 */
  padding: 0.4rem 1rem;
  border-radius: 8px;
  border: none;
  outline: 0;
  cursor: pointer;
  /** 버튼 텍스트 */
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  margin: 10px;

  /** 비활성 상태일 때의 스타일 */
  &:disabled {
    color: ${colors.gray};
    background: ${colors.lightGray};
  }
`;

export type ToggleVariants = 'primary';

const variants: { [key in ToggleVariants]: any } = {
  primary: css`
  > p {
    color: ${colors.brown};
    display: inline-block;
    margin: 0;
  }
  &:not(:disabled) {
    background: ${colors.lightYellow};
    color: ${colors.brown};

    &:hover {
      background: ${colors.yellow};
    }
  }
`,
};

export interface ToggleProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 버튼 스타일 */
  variant?: ToggleVariants;
  separator?: string;
  separatorImage?: boolean;
  first: string;
  second: string;
  active: boolean;
}

/**
 * 버튼입니다.
 *
 */
export const Toggle: FC<ToggleProps> = ({
  variant = 'primary',
  separator = '|',
  separatorImage = false,
  active = true,
  ...restProps
}) => {
  const firstOpacity = (active)? 1 : 0.5 ;
  const secondOpacity = (!active)? 1 : 0.5 ;
  return <button css={[style, variants[variant]]} {...restProps} >
    <p style={{opacity: firstOpacity, left: 0}}> {restProps.first} </p> {'\u00A0'}
    <p style={{opacity: 0.5}} >{(!separatorImage) ? separator: <img src={separator} alt="toggle" />}</p> {'\u00A0'}
    <p style={{opacity: secondOpacity, right: 0}}>{restProps.second}</p>
    </button>;
};

Toggle.displayName = 'Toggle';
