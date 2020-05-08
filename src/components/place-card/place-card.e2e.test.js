import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import PlaceCard from './place-card';
import offers from '../../moks/offers';

Enzyme.configure({adapter: new Adapter()});

describe(`<PlaceCard/>`, () => {
  const handleClick = jest.fn();
  const handleMouseEnter = jest.fn();

  it(`Simulate pressing to title`, () => {
    const wrapper = shallow(
        <PlaceCard
          offer={offers[0]}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
        />
    );

    const btn = wrapper.find(`.place-card__name a`);
    expect(btn).toHaveLength(1);

    btn.simulate(`click`);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it(`When you hover over the card, the correct information falls into the callback function.`, () => {
    const wrapper = shallow(
        <PlaceCard
          offer={offers[0]}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
        />
    );

    wrapper.simulate(`mouseEnter`);
    expect(handleMouseEnter).toHaveBeenCalledWith(offers[0]);
  });
});
