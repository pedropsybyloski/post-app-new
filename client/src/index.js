import ReactDOM from 'react-dom';
import React from 'react'
import { Provider } from 'react-redux'
import App from './App';
import './index.css';
import { applyMiddleware, compose } from 'redux';
import { createStore } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers'

const store = createStore(reducers, compose(applyMiddleware(thunk)))

ReactDOM.render(<Provider store={store}><App /></Provider>,
  document.getElementById('root')
);