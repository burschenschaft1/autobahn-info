// import logo from './logo.svg';
import './App.css';
import { Fragment, useState } from 'react';
import BaustelleGIF from "./baustelle.gif";

// ​/{roadId}​/services​/roadworks
// Liste aktueller Baustellen

// ​/details​/roadworks​/{roadworkId}
// Details einer Baustelle

// ​/{roadId}​/services​/webcam
// Liste verfügbarer Webcams

// ​/details​/webcam​/{webcamId}
// Details einer Webcam

// ​/{roadId}​/services​/parking_lorry
// Liste verfügbarer Rastplätze

// ​/details​/parking_lorry​/{lorryId}
// Details eines Rastplatzes

// /{roadId}​/services​/warning
// Liste aktueller Verkehrsmeldungen

// /details​/warning​/{warningId}
// Details zu einer Verkehrsmeldung

// ​/{roadId}​/services​/closure
// Liste aktueller Sperrungen

// ​/details​/closure​/{closureId}
// Details zu einer Sperrung

// ​/{roadId}​/services​/electric_charging_station
// Liste aktueller Ladestationen

// ​/details​/electric_charging_station​/{stationId}
// Details zu einer Ladestation



function App() {

  let [loaded, setLoaded] = useState(false);
  let [autobahn, setAutobahn] = useState("");
  let [autobahnen, setAutobahnen] = useState([]);
  let [baustellen, setBaustellen] = useState([]);
  let [verkehrsmeldungen, setVerkehrsmeldungen] = useState([]);
  let [sperrungen, setSperrungen] = useState([]);
  
  async function getAutobahnen() {
    const response = (await fetch("https://verkehr.autobahn.de/o/autobahn")).json().then(res => {
      setAutobahnen(res["roads"]);
      setLoaded(true)
    })
  }

  async function getBaustellen() {
    const responseBaustellen = (await fetch (`https://verkehr.autobahn.de/o/autobahn/${autobahn}/services/roadworks`)).json().then(res => {
    setBaustellen(res["roadworks"]);
    })
  }

  async function getVerkehrsmeldungen() {
    const responseVerkehrsmeldungen = (await fetch (`https://verkehr.autobahn.de/o/autobahn/${autobahn}/services/warning`)).json().then(res => {
    setVerkehrsmeldungen(res["warning"]);
    })
  }

  async function getSperrungen() {
    const responseSperrungen = (await fetch (`https://verkehr.autobahn.de/o/autobahn/${autobahn}/services/closure`)).json().then(res => {
    setSperrungen(res["closure"]);
    })
  }



  
    
  return (
    <div className="App">
      <header className="App-header" style={{marginTop: "20rem"}}>
        <button onClick={getAutobahnen}>Hallo mein Name ist Gerolsteiner und ich schmecke nach Gerolsteiner aus Lichtenstein.</button>
      </header>
      {loaded ? 
      <Fragment>
        <h3>Autobahnen</h3>
        <select onChange={(e) => setAutobahn(e.target.value)}>
        <option>----</option>
        {autobahnen.map((a) => {
          return <option >{a}</option>
        })}
        </select>
        <p>{autobahn}</p>
        <button onClick={getBaustellen}>Erhalte Infos zu Baustellen</button>
        <div>
          {baustellen.map((a) => {
            console.log(a)
            return <p>{a.title}</p>})}
        </div>
        <img src={BaustelleGIF}/>
      </Fragment> : null
      }
    </div>
  );
}

export default App;
