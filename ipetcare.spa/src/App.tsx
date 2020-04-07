import React, { useEffect } from 'react'
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom'
import './index.css'
import { HomeScreen } from './features/homePage/containers/homeScreen'
import { RegisterForm } from './features/auth/containers/registerForm'
import { LoginForm } from './features/auth/containers/loginForm'
import { LoggedInNavbar } from './pageElements/containers/loggedInNavbar'
import { NotLoggedNavbar } from './pageElements/containers/notLoggedNavbar'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './state/user/userActions'
import { getUserState } from './utils/localStorageHelper'
import { Grid, Card, Typography } from '@material-ui/core'
import { RootState } from './state/store'
import { RaceForm } from './features/race/components/raceForm'
import { RaceList } from './features/race/components/raceList'
import PetsList from './features/pets/containers/petsList'
import { AdminScreen } from './features/homePage/containers/adminScreen'
import { OwnerScreen } from './features/homePage/containers/ownerScreen'
import { RaceScreen } from './features/race/containers/raceScreen'
import { SpeciesScreen } from './features/species/containers/speciesScreen'
import { EditProfilePage } from './features/profile/containers/editProfilePage'

const App: React.FC = () => {
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.user.user)

  useEffect(() => {
    const user = getUserState()
    if (user) {
      dispatch(setUser(user))
    }
  }, [])

  const header =
    user && user.token?.length > 0 ? (
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
              <Route path="/admin" component={AdminScreen} />
              <Route path="/owner" component={OwnerScreen} />
              <Route path="/races" component={RaceScreen} />
              <Route path="/species" component={SpeciesScreen} />
              <Route path="/pets" exact component={PetsList} />
              <Route path="/profile/edit" component={EditProfilePage} />
            </Switch>
          </Grid>
        </Grid>
      </BrowserRouter>
    </div>
  )
}

export default App
