/* @jsx jsx */

import * as fishData from '../../fishData'
import _ from 'lodash';
 // eslint-disable-next-line 
import { jsx, css } from '@emotion/core';
import React, { FC, useEffect, useMemo, useState, Suspense } from 'react';
import FishList from './FishList';
import { Select, Search, Toggle } from '../../ui';
import text from '../../constants/text';
import containerStyle from '../../styles/containerStyle';
import translateIcon from '../../images/translate-icon.svg';
// import media from 'css-in-js-media';
import analytics from '../../constants/ga';

const FishListContainer: FC = () => {
  const fishes = fishData.dataset;

  const [date, setDate] = useState<Date>(() => new Date());
  const nowMonth = date.getMonth();
  const nowHours = date.getHours();

  useEffect(() => {
    const onWindowFocus = () => {
      setDate(new Date());
    };

    window.addEventListener('focus', onWindowFocus);

    return () => {
      window.addEventListener('focus', onWindowFocus);
    };
  }, []);

  useEffect(() => {
    analytics.ga("send", "pageview", "/home");
  }, []);

  const [hemisphereToggle, setHemisphereToggle] = useState<boolean>(
    true,
  );

  const [translateToggle, setTranslateToggle] = useState<boolean>(
    true,
  );

  const [month, setMonth] = useState<'default' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12'>(
    'default',
  );

  const [searchContent, serSearchContent] = useState<string>(
    '',
  );

  const [place, setPlace] = useState<'default' | 'river' | 'clifftop' | 'pond' | 'ocean' | 'pier'>(
    'default',
  );

  const { available } = useMemo(
    () => reduceFishesFromNow(fishes, nowMonth, nowHours, (hemisphereToggle)? 'northern': 'southern', place, searchContent, month),
    [fishes, nowHours, nowMonth, hemisphereToggle, place, searchContent, month],
  );
  return (
    <div>
      <Suspense fallback="Loading...">
        <div css={[containerStyle, filterStyle]}>
          <div css={[selectLeftStyle]}>
            <Toggle first={text.NORTHERN} second={text.SOUTHERN} active={hemisphereToggle} onClick={(e) => {
              setHemisphereToggle(!hemisphereToggle as any)
            }} />
            <Select
              defaultValue={text.PLACE_DEFAULT}
              onChange={(e) => setPlace(e.target.value as any)}
            >
              <option value="default">{text.PLACE_DEFAULT}</option>
              <option value="river">{text.PLACE_RIVER}</option>
              <option value="clifftop">{text.PLACE_CLIFFTOP}</option>
              <option value="pond">{text.PLACE_POND}</option>
              <option value="ocean">{text.PLACE_OCEAN}</option>
              <option value="pier">{text.PLACE_PIER}</option>
              <option value="month">{text.PLACE_MOUTH}</option>
            </Select>
            <Select
              defaultValue={'출현시기'}
              onChange={(e) => setMonth(e.target.value as any)}
            > 
              <option value={"default"}>{text.APPEARANCE}</option>
              {
                _.range(1, 13).map((item) => {
                  return <option value={item.toString()}>{item.toString()}</option>
                })
              }
            </Select>
          </div>

          <div css={[selectRightStyle]}>
            <Search
              onChange={(e) => serSearchContent(e.target.value as any)}
              placeholder={"물고기 검색"}
              value={searchContent}/>
            <Toggle first={'한'} second={'A'} active={translateToggle} separator={translateIcon} separatorImage={true} onClick={(e) => {
              setTranslateToggle(!translateToggle as any)
            }} />
          </div>
        </div>

        <FishList fishes={available} listText="지금 잡을수 있는 물고기" />
      </Suspense>
    </div>
  );
};

FishListContainer.displayName = 'FishListContainer';

export default FishListContainer;

const filterStyle = css`
  display: flex;
  padding: 0.5rem;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const selectRightStyle = css`
  display: flex;
  justify: flex-end;
  margin-top: 15px;
`;

const selectLeftStyle = css`
  display: flex;
  margin-top: 15px;
`;

interface ReduceFishesResult {
  available: fishData.Fish[];
}

const reduceFishesFromNow = (
  fishes: fishData.Fish[],
  nowMonth: number,
  nowHours: number,
  hemisphere: 'northern' | 'southern',
  placeSelect: 'default' | 'river' | 'clifftop' | 'pond' | 'ocean' | 'pier',
  searchContent: string,
  month: string,
): ReduceFishesResult => {
  return fishes.reduce<ReduceFishesResult>(
    (acc, fish) => {
      const { applyHours, place, name,  } = fish;
      
      const applyMonths =
        hemisphere === 'southern'
          ? fish.applyMonths.map((month) => (month + 6) % 12)
          : fish.applyMonths;

      const isAvailableNow =
        applyMonths.includes((month === 'default')? nowMonth : Number(month)) &&
        isApplyTimeFromNow(applyHours, nowHours) &&
        (placeSelect === 'default' || place.includes(placeSelect)) &&
        (searchContent === '' || name.includes(searchContent));

      if (isAvailableNow) {
        acc['available'].push({
          ...fish,
          applyMonths,
        })
      }

      return acc;
    },
    { available: []},
  );
};
const isApplyTimeFromNow = (
  applyHours: [number, number][],
  nowHours: number,
): boolean => {
  return applyHours.some(
    ([fromHours, endHours]) => (fromHours < endHours) ? 
      (fromHours <= nowHours && endHours >= nowHours) :  (fromHours <= nowHours || endHours >= nowHours),
  );
};
