import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState(null);

  const [address, setAddress] = useState("");
  const [valuation, setValuation] = useState("");
  const [total, setTotal] = useState(0);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const headers = { 'x-hasura-user-id': 'OFy22JCTOKbqrsF' }
    fetch('https://take-home.hasura.app/api/rest/properties/all', {headers}).then(res => {
      if(res.ok) {
        return res.json()
      } else {
        console.log("error in API")
      }
    }).then(returnData => {
      setData(returnData.properties)
      var sumData = 0;
      for(const row of data) {
        sumData += row.valuation
      }
      setTotal(sumData)
    })
  }, [])



  const numberWithCommas = x => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const handleAccept = () => {
    var myHeaders = new Headers();
    myHeaders.append("x-hasura-user-id", "OFy22JCTOKbqrsF");

    var formdata = new FormData();
    formdata.append("address", address);
    formdata.append("valuation", valuation);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    handleVisible()

    fetch('https://take-home.hasura.app/api/rest/properties/add', requestOptions).then(res => {
      if(res.ok) {
        return res.json()
      }
    }).then(returnData => {
      setData([
        ...data,
        {'id': returnData.add_property.id, 'address': address, 'valuation': valuation}
      ])
      setAddress("")
      setValuation("")
      setTotal(total + valuation)
    })
  }

  const handleVisible = () => {
    setVisible(!visible)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Properties</h1>
      </header>
      <main className='main'>
        <div className='table-div'>

          <button className='add-property' onClick={handleVisible}>Add Property</button>
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
              {data && data.map(row => {
                if(!row.hidden) {
                  return <tr><td className='id-data'>{row.id}</td><td>{row.address}</td><td>${numberWithCommas(row.valuation)}</td></tr>
                }
              })}
              <tr className='invisible-row'>
                <th></th>
                <th></th>
                <th><strong>Total</strong> <span>${numberWithCommas(total)}</span></th>
              </tr>
            </tbody>
          </table>
        </div>
        {visible && 
          <div className='form'>
            <p className='form-title'>Enter property details</p>
            <div className='address-input'>     
              <label>Address</label>
              <input onChange={event => {
                setAddress(event.target.value)
              }} value={address}></input>
            </div>
            <div className='valuation-input'>     
              <label>Valuation</label>
              <input type="number" onChange={event => {
                setValuation(event.target.value)
              }} value={valuation}></input>
            </div>

            <div className='button-group'>
              <button className='cancel' onClick={handleVisible}>Cancel</button>
              <button className='accept' onClick={handleAccept}>Accept</button>
            </div>
          </div>
          }
        
      </main>
    </div>
  );
}

export default App;
