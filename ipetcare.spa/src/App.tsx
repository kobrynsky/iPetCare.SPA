import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { HomeScreen } from './homePage/homeScreen'
import { RegisterForm } from './auth/components/registerForm'
import { LoginForm } from './auth/components/loginForm'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={HomeScreen} exact />
        <Route path="/register" component={RegisterForm} />
        <Route path="/login" component={LoginForm} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
