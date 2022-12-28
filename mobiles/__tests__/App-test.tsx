/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { Item } from 'react-native-paper/lib/typescript/components/List/List';
import { getPrizeAmount } from '../shared/pages/HomePage';

// it('renders correctly', () => {
//   renderer.create(<App />);
// });

it('test', () => {
  const possibleWinnings = { 1: 0, 2: 0, 5: 0, 10: 0, 20: 0, 50: 0, 100: 0 };

  let prize = 25000;
  while (prize > 0) {
    const amt = getPrizeAmount(prize);
    possibleWinnings[amt] += 1;

    prize -= amt;
  }
  console.log(possibleWinnings);
});
