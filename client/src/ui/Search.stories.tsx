import React from 'react';
import { Search } from './Search';

export default {
  title: 'components|Search',
  component: Search,
};

export const select = () => {
  return (
    <Search placeholder={"물고기 검색"} />
  );
};
