import './index.css';

import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from './App';
import { GlobalContextProvider } from './context/GlobalContext';
import CreateDeck from './pages/createDeck/CreateDeck';
import Dashboard from './pages/dashboard/Dashboard';
import Demo from './pages/demo/Demo';
import DetailDeck from './pages/detailDeck/DetailDeck';
import EditDeck from './pages/editDeckPage/EditDeck';
import Home from './pages/home/Home';
import NotFound from './pages/notFound/NotFound';
import PlayPage from './pages/playPage/PlayPage';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <GlobalContextProvider>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<Home />} />
              <Route path="/demo" element={<Demo />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/createDeck" element={<CreateDeck />} />
              <Route path="/playPage" element={<PlayPage />} />
              <Route path="/editDeckPage" element={<EditDeck />} />
              <Route path="/dashboard/:id" element={<DetailDeck />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </GlobalContextProvider>
    </ChakraProvider>
  </React.StrictMode>,
);
