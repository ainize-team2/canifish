/** @jsx jsx */
import { jsx, css } from '@emotion/core';
 // eslint-disable-next-line 
import type, { FC, ButtonHTMLAttributes } from 'react';
import colors from './colors';

const style = css`
  /** 버튼 모양 */
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: none;
  outline: 0;
  cursor: pointer;

  /** 버튼 텍스트 */
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: -0.02em;

  /** 비활성 상태일 때의 스타일 */
  &:disabled {
    color: ${colors.gray};
    background: ${colors.lightGray};
  }
`;

export type ButtonVariants = 'primary';

const variants: { [key in ButtonVariants]: any } = {
  primary: css`
    &:not(:disabled) {
      background: ${colors.darkBrown};
      color: ${colors.white};

      &:hover {
        background: ${colors.lightPurple};
      }

      &:active {
        background: ${colors.purple};
      }
    }
  `
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 버튼 스타일 */
  variant?: ButtonVariants;
}

/**
 * 버튼입니다.
 *
 */
export const Button: FC<ButtonProps> = ({
  variant = 'primary',
  ...restProps
}) => {
  return <button css={[style, variants[variant]]} {...restProps} />;
};

Button.displayName = 'Button';
