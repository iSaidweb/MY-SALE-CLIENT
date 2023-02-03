import React from 'react';
import ReactDOM from 'react-dom/client';
import Main from './main';
import './global.scss';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
       <Main />
    </Provider>
    </BrowserRouter>
  </React.StrictMode>
);