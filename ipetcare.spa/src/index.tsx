import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store } from './state/store'
import { createBrowserHistory } from 'history'

import './index.css'
import 'typeface-roboto'

import App from './App'
export const history = createBrowserHistory()

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
