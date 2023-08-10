import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './style.css'
import { Signature, useActions } from '../src';

const App = () => {

  const { clearSignature, getImageSignature, isEmpty } = useActions()

  const [signature, setSignature] = React.useState("")

  const handleSignature = () => {
    clearSignature()
    setSignature("")
  }

  const getSignature = () => {
    !isEmpty() ? setSignature(getImageSignature()) : setSignature("")
  }

  return (
    <div className="container">
      <div>
        <button onClick={handleSignature}>Clear</button>
        <button onClick={getSignature}>Get signature</button>
      </div>
      {!signature ? null : <img src={signature} alt="" />}
      <Signature
        height={500}
        width={500}
        penColor='blue'
        styles={{
          border: "1px solid red"
        }}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
