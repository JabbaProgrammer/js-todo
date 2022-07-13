import React from 'react';
import { ThemeSwitcherProvider } from 'react-css-theme-switcher';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './storage';

const themes = {
  Dark: `./styles/dark-theme.css`,
  Light: `./styles/light-theme.css`,
};

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ThemeSwitcherProvider themeMap={themes} defaultTheme="Light">
      <Provider store={store}>
          <App />
      </Provider>
    </ThemeSwitcherProvider>
  </React.StrictMode>
);