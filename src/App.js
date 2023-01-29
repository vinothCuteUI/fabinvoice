import { useEffect, useReducer, useState } from 'react';
import './App.css';
import Createinvoice from './Components/CreateInvoice/Createinvoice';
import DataProvider from './Components/Data-store/DataProvider';

function App() {

  return (
    <DataProvider>
        <Createinvoice />
    </DataProvider>
    
  );
}

export default App;
