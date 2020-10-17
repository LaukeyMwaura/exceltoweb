import React, { useState } from 'react';
import './App.css';
import * as XLXS from 'xlsx'

function App() {

  const [items, setItems] = useState([])
  const readExcel = (file) => {

    const promise = new Promise((resolve, reject) => {


      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file)


      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLXS.read(bufferArray, { type: 'buffer' });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLXS.utils.sheet_to_json(ws);

        resolve(data);
      };
      fileReader.onerror = ((error) => {
        reject(error);
      })
    });
    promise.then((d) => {

      setItems(d)
    })

  }
  return (
    <div className="App container">
      <input type="file" onChange={(e) => {
        const file = e.target.files[0];
        readExcel(file)
      }} />


      <table class="table container">
        <thead>
          <h2 className="container-fluid">Need to convert an excel file to a web page?</h2>
          <h3>Change the values in the table and enjoy...😁</h3>
          <tr>
            <th scope="col">number</th>
            <th scope="col">order</th>

          </tr>
        </thead>
        <tbody>
          {items.map((d) => (
            <tr key={d.order}>
              <th>{d.order}</th>
              <td>{d.random}</td>
            </tr>
          ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default App;
