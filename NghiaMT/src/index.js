import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

import GlobalStyles from '~/components/GlobalStyles'
import { Provider } from 'react-redux';
import "../src/config/Interceptors";
import store from './redux/store';
import { CartProvider } from './context/cartContext';
import { UserProvider } from './context/userContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <UserProvider>
      <GlobalStyles>
        <CartProvider>
          <App />
        </CartProvider>
      </GlobalStyles>
    </UserProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
