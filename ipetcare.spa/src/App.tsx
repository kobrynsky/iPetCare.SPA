import React, { useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './index.css'
import { HomeScreen } from './homePage/homeScreen'
import { RegisterForm } from './auth/components/registerForm'
import { LoginForm } from './auth/components/loginForm'
import { LoggedInNavbar } from './pageElements/loggedInNavbar'
import { NotLoggedNavbar } from './pageElements/notLoggedNavbar'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './state/userActions'
import { getUserState } from './utils/localStorageHelper'
import { Grid } from '@material-ui/core'
import { StoreState } from './store'

const App: React.FC = () => {
  const dispatch = useDispatch()
  const user = useSelector((state: StoreState) => state.user)

  useEffect(() => {
    const user = getUserState()
    if (user) {
      dispatch(setUser(user))
    }
  }, [])

  return (
    <div className="app">
      <div className="background"></div>
      <BrowserRouter>
        <Grid container direction="column">
          <Grid container justify="flex-end">
            {user.token.length > 0 ? <LoggedInNavbar /> : <NotLoggedNavbar />}
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
