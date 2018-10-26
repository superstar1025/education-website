import React from 'react';
import { test } from 'ava';

import Dashboard from '../index';

const { expect, mount } = testHelper;

const TestComponent = () => <div id="test-component" />;

test('renders its children', () => {
  const component = (
    <Dashboard>
      <TestComponent />
    </Dashboard>
  );
  const wrapper = mount(component);
  expect(wrapper.find('#test-component').length).toEqual(1);
});
