import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

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
    <ThemeProvider theme={theme}>
        <App />
        </ThemeProvider>,
    document.querySelector('main')
);
