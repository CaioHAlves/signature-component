import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './style.css'
import { Signature, useActions } from '../src';

const App = () => {

  const { clearSignature, getImageSignature, isEmpty, changeBackgroundColor } = useActions()

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
        <button onClick={() => changeBackgroundColor("#87CEEB")}>Background Blue</button>
        <button onClick={() => changeBackgroundColor("#F7F7F7")}>Background Gray</button>
      </div>
      {!signature ? null : <img src={signature} alt="" />}
      <Signature
        height={500}
        width={500}
        lineWidth={10}
        penColor='blue'
        styles={{
          border: "1px solid red"
        }}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
