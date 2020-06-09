/* @jsx jsx */
import * as fishData from '../../fishData'
import { FishCard, Text } from '../../ui';
 // eslint-disable-next-line 
import { css, jsx } from '@emotion/core';
 // eslint-disable-next-line 
import media, { getBreakPoints } from 'css-in-js-media';
import React from 'react';
import text from '../../constants/text';
import containerStyle from '../../styles/containerStyle';

export interface FishListProps {
  fishes: fishData.Fish[];
  listText: string;
  lang: 'english' | 'korean',
}

const FishList: React.FC<FishListProps> = React.memo(({ fishes, listText, lang }) => {

  const placeTextMap: { [key in fishData.FishPlace]: string } = {
    river: text.PLACE_RIVER[lang],
    mouth: text.PLACE_MOUTH[lang],
    clifftop: text.PLACE_CLIFFTOP[lang],
    pond: text.PLACE_POND[lang],
    ocean: text.PLACE_OCEAN[lang],
    pier: text.PLACE_PIER[lang],
  };

  const getNameText = (name: string, imageUrl: string) => {
    return (lang === 'korean') ? name : imageUrl.split('.')[0].replace('_', '');
  }

  const getPlaceText = (
    fishPlaces: fishData.FishPlace[],
    { onlyRaining }: { onlyRaining: boolean },
  ): string => {
    return [
      ...fishPlaces.map((place) => placeTextMap[place]),
      onlyRaining && text.ONLY_RAINING[lang],
    ]
      .filter(Boolean)
      .join(', ');
  };

  const shadowSizeTextMap: { [key in fishData.FishShadowSize]: string } = {
    narrow: text.SIZE_NARROW[lang],
    1: text.SIZE_XSMALL[lang],
    2: text.SIZE_SMALL[lang],
    3: text.SIZE_MEDIUM[lang],
    4: text.SIZE_LARGE[lang],
    5: text.SIZE_XLARGE[lang],
    6: text.SIZE_XXLARGE[lang],
  };

  const getShadowSizeText = (
    shadowSize: fishData.FishShadowSize,
    { hasFin, hasSound }: { hasFin: boolean; hasSound: boolean },
  ): string => {
    return [
      shadowSizeTextMap[shadowSize] +
        (typeof shadowSize === 'number' ? `(${shadowSize})` : ''),
      hasFin && text.HAS_FIN[lang],
      hasSound && text.HAS_SOUND[lang],
    ]
      .filter(Boolean)
      .join(', ');
  };

  const getApplyHoursText = (applyHours: [number, number][]) => {
    return applyHours
      .map((hours) => {
        if (isAllDay(hours)) {
          return text.ALL_DAY[lang];
        }

        return hours.map((hour) => `${hour}:00`).join(' ~ ');
      })
      .join(', ');
  };
  
  const isAllDay = (hours: [number, number]) => hours[0] === 0 && hours[1] === 23;

  return (
    <React.Fragment>
      <Text variant="listTitle">{listText}</Text>
      <ul css={style}>
        {
        fishes.map((fish) => {
          const {
            id,
            name,
            price,
            place,
            shadowSize,
            hasFin,
            hasSound,
            applyHours,
            imageUrl,
            onlyRaining,
            applyMonths,
          } = fish;
          const placeText = getPlaceText(place, { onlyRaining });
          const shadowSizeText = getShadowSizeText(shadowSize, {
            hasFin,
            hasSound,
          });
          const nameText = getNameText(name, imageUrl);
          const applyHoursText = getApplyHoursText(applyHours);
          return (
            <li key={id}>
              <FishCard
                imageUrl={`/images/fishes/${imageUrl}`}
                name={nameText}
                price={price}
                place={placeText}
                shadowSize={shadowSizeText}
                applyHours={applyHoursText}
                applyMonths={applyMonths}
                lang={lang}
              />
            </li>
          );
        })}
      </ul>
    </React.Fragment>
  );
});

FishList.displayName = 'FishList';

const style = css`
  margin: 0 auto 2rem;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  list-style: none;

  ${containerStyle};

  > li {
    padding: 0.5rem;
    flex: 0 0;

    ${media('>=largeDesktop')} {
      flex-basis: 25%;
    }

    ${media('<=largeDesktop', '>desktop')} {
      flex-basis: 33.3%;
    }

    ${media('<=desktop', '>tablet')} {
      flex-basis: 50%;
    }

    ${media('<=tablet')} {
      flex-basis: 100%;
    }
  }
`;

export default FishList;
