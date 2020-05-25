import React from 'react';
import renderer from 'react-test-renderer';

import ReviewsList from './reviews-list';
import {REVIEWS} from '../../tests-mocks';

it(`Should render ReviewsList correctly`, () => {
  const tree = renderer.create(<ReviewsList reviews={REVIEWS} />).toJSON();

  expect(tree).toMatchSnapshot();
});
