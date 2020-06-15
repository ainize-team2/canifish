/* @jsx jsx */

import * as fishData from '../fishData'
import _ from 'lodash';
 // eslint-disable-next-line 
import { jsx, css } from '@emotion/core';
import React, { FC, useEffect, useMemo, useState, Suspense } from 'react';
import FishList from './fish/FishList';
import { Select, Search, Toggle } from '../ui';
import text, { ENG_MONTH } from '../constants/text';
import translateIcon from '../images/translate-icon.svg';
// import media from 'css-in-js-media';
import analytics from '../constants/ga';
import media, { getBreakPoints } from 'css-in-js-media';

const Home: FC = () => {
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


  const [month, setMonth] = useState<'default' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12'>(
    'default',
  );

  const [searchContent, serSearchContent] = useState<string>(
    '',
  );

  const [place, setPlace] = useState<'default' | 'river' | 'clifftop' | 'pond' | 'ocean' | 'pier'>(
    'default',
  );

  const { available, etc } = useMemo(
    () => reduceFishesFromNow(fishes, nowMonth, nowHours, (hemisphereToggle)? 'northern': 'southern', place, searchContent, month),
    [fishes, nowHours, nowMonth, hemisphereToggle, place, searchContent, month],
  );

  const [lang, setLang] = useState<'english' | 'korean'>(
    (navigator.language === 'ko-KR') ? 'korean' : 'english',
  );

  const [translateToggle, setTranslateToggle] = useState<boolean>(
    (lang === 'korean'),
  );

  const monthText = (month === 'default') ?
   text.SEASON_NOW[lang] : (lang === 'korean') ? month + '월에' : ENG_MONTH[Number(month) - 1];

  const availableTitle = (searchContent !== '') ? '' : (lang === 'korean') ?
   `${monthText} ${text.AVAILABLE_FISH[lang]}` : `${text.AVAILABLE_FISH[lang]} in ${monthText}`;

  return (
    <div>
      <Suspense fallback="Loading...">
        <div css={[filterStyle]}>
          <div className="filter">
            <div className="filter sub">
              <Toggle first={text.NORTHERN[lang]} second={text.SOUTHERN[lang]} active={hemisphereToggle} onClick={(_) => {
                setHemisphereToggle(!hemisphereToggle as any)
              }} />
            </div>
            <div className="filter sub">
              <Select
                defaultValue={text.PLACE_ALL[lang]}
                value={place}
                onChange={(e) => setPlace(e.target.value as any)}
                title={text.PLACE_TITLE[lang]}
              >
                <option value="default">{text.PLACE_ALL[lang]}</option>
                <option value="river">{text.PLACE_RIVER[lang]}</option>
                <option value="clifftop">{text.PLACE_CLIFFTOP[lang]}</option>
                <option value="pond">{text.PLACE_POND[lang]}</option>
                <option value="ocean">{text.PLACE_OCEAN[lang]}</option>
                <option value="pier">{text.PLACE_PIER[lang]}</option>
                <option value="month">{text.PLACE_MOUTH[lang]}</option>
              </Select>
              <Select
                defaultValue={text.SEASON_NOW[lang]}
                value={month}
                onChange={(e) => setMonth(e.target.value as any)}
                title={text.SEASON_TITLE[lang]}
              > 
                <option value={"default"}>{text.SEASON_NOW[lang]}</option>
                { 
                  _.range(1, 13).map((item) => {
                    return <option value={item.toString()}>{(lang === "korean") ? item.toString() + '월' : ENG_MONTH[item - 1] }</option>
                  })
                }
              </Select>
            </div>
          </div>

          <div className="filter sub" css={{justify: "flex-end"}}>
            <Search
              onChange={(e) => {
                serSearchContent(e.target.value as any);
                setMonth('default');
                setPlace('default');
              }}
              placeholder={text.SEARCH_PLACEHOLDER[lang]}
              value={searchContent}/>
            <Toggle first={'한'} second={'A'} active={translateToggle} separator={translateIcon} separatorImage={true} onClick={(e) => {
              setLang((lang === 'english') ? 'korean' : 'english');
              setTranslateToggle(!translateToggle as any)
            }} />
          </div>
        </div>

        <FishList fishes={available} listText={ availableTitle } lang={lang} />
        {
          (searchContent === '') ? <FishList fishes={etc} listText={text.ETC_FISH[lang]} lang={lang} />  : ""
        }
      </Suspense>
    </div>
  );
};

Home.displayName = 'home';

export default Home;

const filterStyle = css`
  margin-left: auto;
  margin-right: auto;
  display: flex;
  padding: 0.5rem;
  justify-content: space-between;
  flex-wrap: wrap;  

  div.filter {
    display: flex;
    flex-wrap: wrap;
  }

  div.sub {
    margin-top: 10px;
  }
  

  ${media('>=largeDesktop')} {
    max-width: ${getBreakPoints().largeDesktop}px;
  }
  
  ${media('>=largeDesktop')} {
    max-width: ${getBreakPoints().largeDesktop}px;
  }

  ${media('<=largeDesktop', '>desktop')} {
    max-width: ${getBreakPoints().desktop}px;
  }

  ${media('<=desktop', '>tablet')} {
    max-width: ${getBreakPoints().tablet}px;
  }
`;


interface ReduceFishesResult {
  available: fishData.Fish[];
  etc: fishData.Fish[];
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
      const { applyHours, place, name, imageUrl } = fish;
      
      const applyMonths =
        hemisphere === 'southern'
          ? fish.applyMonths.map((month) => (month + 6) % 12)
          : fish.applyMonths;

      const isAvailableNow =
        applyMonths.includes((month === 'default')? nowMonth : Number(month) - 1) &&
        isApplyTimeFromNow(applyHours, nowHours) &&
        (placeSelect === 'default' || place.includes(placeSelect)) &&
        (searchContent === '' || name.includes(searchContent) || imageUrl.replace('_', '').includes(searchContent));

      if (isAvailableNow) {
        acc['available'].push({
          ...fish,
          applyMonths,
        })
      } else {
        acc['etc'].push({
          ...fish,
          applyMonths,
        })
      }

      return acc;
    },
    { available: [], etc: [] },
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
