import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Drawing } from '../src';

describe('it', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Drawing />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
