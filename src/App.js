import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const headers = { 'x-hasura-user-id': 'OFy22JCTOKbqrsF' }
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch('https://take-home.hasura.app/api/rest/properties/all', {headers}).then(res => {
      if(res.ok) {
        return res.json()
      } else {
        console.log("error in API")
      }
    }).then(data => {
      setData(data)
    })
  }, [])
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Properties</h1>
      </header>
      <main>
        <button>Add Property</button>
        <table>
          <tr>
            <th>ID</th>
            <th>Address</th>
            <th>Valuation</th>
          </tr>
          {data && data.properties.map(row => {
            if(!row.hidden) {
              return <tr><td>{row.id}</td><td>{row.address}</td><td>{row.valuation}</td></tr>
            }
        })}
        </table>
      </main>
    </div>
  );
}

export default App;
