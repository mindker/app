import './index.css';

import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from './App';
import { GlobalContextProvider } from './context/GlobalContext';
import Demo from './pages/demo/Demo';
import Home from './pages/home/Home';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <GlobalContextProvider>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<Home />} />
              <Route path="/demo" element={<Demo />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </GlobalContextProvider>
    </ChakraProvider>
  </React.StrictMode>,
);
