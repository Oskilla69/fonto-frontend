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

  const numberWithCommas = x => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Properties</h1>
      </header>
      <main className='main'>
        <div className='table-div'>

          <button className='add-property'>Add Property</button>
          <table className='table'>

            <colgroup>
              <col className="id-col" span="1"/>
              <col className="address-col" span="1"/>
              <col className="valuation-col" span="1"/>
            </colgroup>
            <tbody>
              <tr>
                <th className='id-head'>ID</th>
                <th className='address-head'>Address</th>
                <th className='valuation-head'>Valuation</th>
              </tr>
              {data && data.properties.map(row => {
                if(!row.hidden) {
                  return <tr><td className='id-data'>{row.id}</td><td>{row.address}</td><td>${numberWithCommas(row.valuation)}</td></tr>
                }
              })}
            </tbody>
          </table>
        </div>

        <div className='form'>
          <p>Enter property details</p>
          <div className='address-input'>     
            <label>Address</label>
            <input></input>
          </div>
          <div className='valuation-input'>     
            <label>Valuation</label>
            <input></input>
          </div>

          <div className='button-group'>
            <button className='cancel'>Cancel</button>
            <button className='accept'>Accept</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
