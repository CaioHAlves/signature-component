import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Drawing } from '../src';

const App = () => {
  return (
    <div>
      <Drawing />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
