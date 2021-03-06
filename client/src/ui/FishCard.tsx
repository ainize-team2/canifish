/** @jsx jsx */
import { css, jsx } from '@emotion/core';
 // eslint-disable-next-line 
import type, { FC } from 'react';
import { useRef, useEffect } from 'react';
import { FaClock, FaFish, FaMapPin } from 'react-icons/fa';
import { ApplyMonths } from './ApplyMonths';
import colors from './colors';
import text from '../constants/text';

export interface FishCardProps {
  /** 생선 이름 */
  name: string;
  /** 가격 */
  price: number;
  /** 출현 시간 */
  applyHours: string;
  /** 출현 장소 */
  place: string;
  /** 그림자 크기 */
  shadowSize: string;
  /** 출현 기간 */
  applyMonths: number[];
  /** 이미지 URL */
  imageUrl: string;

  lang: 'korean' | 'english'
}

const { format } = new Intl.NumberFormat();

export const FishCard: FC<FishCardProps> = ({
  name,
  price,
  applyHours,
  place,
  shadowSize,
  applyMonths,
  imageUrl,
  lang
}) => {
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const loadImage = (imageElement: HTMLImageElement) => {
      
      imageElement.src = String(imageElement.dataset.src);
      imageElement.classList.add('loaded');
    };

    if ('IntersectionObserver' in window) {
      const intersectionCallback: IntersectionObserverCallback = (
        [entry],
        observer,
      ) => {
        if (entry.isIntersecting) {
          loadImage(entry.target as HTMLImageElement);
          observer.unobserve(entry.target);
        }
      };

      const observer = new IntersectionObserver(intersectionCallback);
      if (imageRef.current) {
        observer.observe(imageRef.current);
      }
      return () => observer?.disconnect();
    }
    if (imageRef.current) {
      loadImage(imageRef.current);
    }
  }, []);

  return (
    <section css={fishCardStyle}>
      <figure css={imageStyle}>
        <img ref={imageRef} data-src={imageUrl} alt={name} />
      </figure>
      <div css={nameAndPriceAndInformationStyle}>
        <div css={nameAndPriceStyle}>
          <h2>{name}</h2>
          <h3>{format(price)}{text.PRICE[lang]}</h3>
        </div>
        <ul css={informationStyle}>
          <li className="time">
            <FaClock />
            {applyHours}
          </li>
          <li>
            <FaMapPin />
            {place}
          </li>
          <li>
            <FaFish />
            {shadowSize}
          </li>
        </ul>
      </div>
      <ApplyMonths applyMonths={applyMonths} />
    </section>
  );
};

FishCard.displayName = 'FishCard';

const fishCardStyle = css`
  padding: 1rem;
  display: flex;
  align-items: center;
  background-color: ${colors.white};
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.08);
  border-radius: 0.5rem;

  .apply-months {
    margin-left: auto;
    flex-shrink: 0;
  }
`;

const imageStyle = css`
  width: 3rem;
  min-width: 3rem;
  height: 3rem;
  background-color: ${colors.imageBgColor};
  border-radius: 9999px;
  margin: 0 0.5rem 0 0;

  > img {
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity 200ms ease-out;

    &.loaded {
      opacity: 1;
    }
  }
`;

const nameAndPriceAndInformationStyle = css`
  margin-right: auto;
`;

const nameAndPriceStyle = css`
  margin-bottom: 0.5rem;
  display: flex;
  align-items: baseline;

  h2,
  h3 {
    letter-spacing: -0.04em;
    font-size: 0.875rem;
    line-height: 0.875rem;
    font-weight: 800;
  }

  h2 {
    margin: 0 0.25rem 0 0;
    color: ${colors.brown};
  }

  h3 {
    margin: 0;
    color: ${colors.green};
  }
`;

const informationStyle = css`
  list-style: none;
  margin: 0;
  padding: 0;

  display: flex;
  flex-wrap: wrap;

  li {
    color: ${colors.lightBrown};
    font-weight: 800;
    font-size: 0.75rem;
    letter-spacing: -0.04em;
    display: flex;
    align-items: center;
    margin: 0.125rem 0;

    svg {
      width: 0.75rem;
      margin-right: 0.25rem;
    }

    &.time {
      flex: 0 0 100%;
    }
  }

  li + li:not(:last-of-type) {
    margin-right: 0.5rem;
  }
`;
