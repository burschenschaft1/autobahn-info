import logo from './logo.svg';
import './App.css';
import { Fragment, useState } from 'react';


function App() {

  let [loaded, setLoaded] = useState(false);
  let [data, setData] = useState([]);
  
  async function getData() {
    const response = (await fetch("https://verkehr.autobahn.de/o/autobahn")).json().then(res => {
    setData(res["roads"]);
    console.log(data);
    setLoaded(true)
  })

  }
    
  return (
    <div className="App">
      <header className="App-header" style={{marginTop: "20rem"}}>
        <button onClick={getData}>Hallo mein Name ist Gerolsteiner und ich schmecke nach Gerolsteiner aus Lichtenstein.</button>
      </header>
      {loaded ? 
      <Fragment>
        <h3>Autobahnen</h3>
        {data.map((a) => {
          return <p>{a}</p>
        })}
      </Fragment> : null}
    </div>
  );
}

export default App;
