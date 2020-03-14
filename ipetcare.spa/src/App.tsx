import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { RegisterScreen } from './auth/registerScreen'
import { HomeScreen } from './homePage/homeScreen'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={HomeScreen} exact />
        <Route path="/register" component={RegisterScreen} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
