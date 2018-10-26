import React from 'react';
import { test } from 'ava';

import Register from '../index';

const { expect, mount } = testHelper;

const TestComponent = () => <div id="test-component" />;

test('renders its children', () => {
  const component = (
    <Register>
      <TestComponent />
    </Register>
  );
  const wrapper = mount(component);
  expect(wrapper.find('#test-component').length).toEqual(1);
});
