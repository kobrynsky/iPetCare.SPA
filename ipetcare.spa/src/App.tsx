import React, { useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './index.css'
import { HomeScreen } from './homePage/homeScreen'
import { RegisterForm } from './auth/components/registerForm'
import { LoginForm } from './auth/components/loginForm'
import { Header } from './pageElements/header'
import { useDispatch } from 'react-redux'
import { setUser } from './state/userActions'
import { getUserState } from './utils/localStorageHelper'
import { UserState } from './state/userReducer'

const App: React.FC = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const user = getUserState()
    if (user) {
      dispatch(setUser(user))
    }
  }, [])

  return (
    <BrowserRouter>
      <div>
        {/* <Header /> */}
        <h1 className="title">iPetCare</h1>
        <Switch>
          <Route path="/" component={HomeScreen} exact />
          <Route path="/register" component={RegisterForm} />
          <Route path="/login" component={LoginForm} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
