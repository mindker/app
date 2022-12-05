import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import Home from './pages/home/Home'
import Demo from './pages/demo/Demo'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GlobalContextProvider } from './context/GlobalContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <GlobalContextProvider>
    <BrowserRouter basename='/'>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<Home />} />
          <Route path='/demo' element={<Demo />} />
        </Route>
      </Routes>
    </BrowserRouter>
   </GlobalContextProvider>
  </React.StrictMode>,
);
