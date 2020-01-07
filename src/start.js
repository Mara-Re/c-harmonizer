import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { createMuiTheme, ThemeProvider, StylesProvider } from '@material-ui/core/styles';

//----FOR REDUX
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducer';
import {Provider} from 'react-redux';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(reduxPromise)));
//^^^^FOR REDUX

const theme = createMuiTheme({
    palette: {
      primary: {
        
        main: '#45748C',
        
      },
      secondary: {
        
        main: '#212121',
       
      },
    }
  });

  

ReactDOM.render(
    <Provider store={store}>
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
      </StylesProvider>
    </Provider>,
    document.querySelector('main')
);
