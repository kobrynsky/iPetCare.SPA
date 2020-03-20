import React, { useEffect } from 'react'
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom'
import './index.css'
import { HomeScreen } from './homePage/homeScreen'
import { RegisterForm } from './auth/components/registerForm'
import { LoginForm } from './auth/components/loginForm'
import { Header } from './pageElements/header'
import { NotLoggedNavbar } from './pageElements/notLoggedNavbar'
import { useDispatch } from 'react-redux'
import { setUser } from './state/userActions'
import { getUserState } from './utils/localStorageHelper'
import { UserState } from './state/userReducer'
import { Grid } from '@material-ui/core'

const App: React.FC = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const user = getUserState()
    if (user) {
      dispatch(setUser(user))
    }
  }, [])

  return (
    <div className="app">
      <BrowserRouter>
        <Grid container direction="column">
          <Grid container justify="flex-end">
            <NotLoggedNavbar />
          </Grid>
          <Grid item>
            <NavLink className="title" to="/">
              <h1>iPetCare</h1>
            </NavLink>
          </Grid>
          <Grid item>
            <Switch>
              <Route path="/" component={HomeScreen} exact />
              <Route path="/register" component={RegisterForm} />
              <Route path="/login" component={LoginForm} />
            </Switch>
          </Grid>
        </Grid>
      </BrowserRouter>
    </div>
  )
}

export default App
