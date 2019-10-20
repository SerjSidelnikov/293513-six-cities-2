import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import PlaceCard from './place-card';

Enzyme.configure({adapter: new Adapter()});

describe(`<PlaceCard/>`, () => {
  it(`Simulate pressing to title`, () => {
    const handleClick = jest.fn();

    const wrapper = shallow(
        <PlaceCard
          offer={`Wood and stone place`}
          onClick={handleClick}
        />
    );

    const btn = wrapper.find(`.place-card__name a`);
    expect(btn).toHaveLength(1);

    btn.simulate(`click`);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
