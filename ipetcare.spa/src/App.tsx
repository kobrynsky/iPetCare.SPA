import React, { useEffect } from 'react'
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom'
import './index.css'
import { HomeScreen } from './homePage/homeScreen'
import { RegisterForm } from './auth/components/registerForm'
import { LoginForm } from './auth/components/loginForm'
import { LoggedInNavbar } from './pageElements/loggedInNavbar'
import { NotLoggedNavbar } from './pageElements/notLoggedNavbar'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './state/userActions'
import { getUserState } from './utils/localStorageHelper'
import { Grid, Card, Typography } from '@material-ui/core'
import { RootState } from './store'
import { UserState } from './state/userReducer'
import { RaceForm } from './race/components/raceForm'
import { RaceList } from './race/components/raceList'
import PetsList from '../src/pets/containers/petsList'

const App: React.FC = () => {
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.user)

  useEffect(() => {
    const user = getUserState()
    if (user) {
      dispatch(setUser(user))
    }
  }, [])

  const header =
    user.token.length > 0 ? (
      <LoggedInNavbar />
    ) : (
      <>
        {/* <Card className="titleContainerNotLogged"> */}
        <NavLink className="titleContainerNotLogged" to="/">
          <Typography className="title" variant="h5">
            iPetCare
          </Typography>
        </NavLink>
        {/* </Card> */}
        <NotLoggedNavbar />
      </>
    )

  return (
    <div className="app">
      <div className="background"></div>
      <BrowserRouter>
        <Grid container direction="column">
          <Grid container justify="space-between">
            {header}
          </Grid>

          <Grid item>
            <Switch>
              <Route path="/" component={HomeScreen} exact />
              <Route path="/register" component={RegisterForm} />
              <Route path="/login" component={LoginForm} />
              <Route path="/race/create" component={RaceForm} />
              <Route
                path="/race/edit/:raceId"
                render={() => <RaceForm editing={true} />}
              />
              <Route path="/races" component={RaceList} />
              <Route path="/pets" exact component={PetsList} />
            </Switch>
          </Grid>
        </Grid>
      </BrowserRouter>
    </div>
  )
}

export default App
