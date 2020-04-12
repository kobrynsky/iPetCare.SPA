import React, { useEffect, useState } from 'react'
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
import { Grid, Typography } from '@material-ui/core'
import { RootState } from './state/store'
import PetsList from './features/pets/containers/petsList'
import { AdminScreen } from './features/homePage/containers/adminScreen'
import { OwnerScreen } from './features/homePage/containers/ownerScreen'
import { RaceScreen } from './features/race/containers/raceScreen'
import { SpeciesPage } from './features/species/containers/speciesPage'
import { EditProfilePage } from './features/profile/containers/editProfilePage'
import { NotFoundPage } from './common/errorPages/notFoundPage'
import { ForbiddenPage } from './common/errorPages/forbiddenPage'
import { UnauthorizedPage } from './common/errorPages/unauthorizedPage'
import { InstitutionsPage } from './features/institutions/containers/institutionsPage';
import { ExaminationTypesPage } from './features/examinations/containers/examinationTypesPage';

const App: React.FC = () => {
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.user.user)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(false)
    const user = getUserState()
    if (user) {
      dispatch(setUser(user))
    }
    setLoaded(true)
  }, [])

  const header =
    user.token && user.token?.length > 0 ? (
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
            {loaded && (
              <Switch>
                <Route path="/" component={HomeScreen} exact />
                <Route path="/register" component={RegisterForm} />
                <Route path="/login" component={LoginForm} />
                <Route path="/admin" component={AdminScreen} />
                <Route path="/owner" component={OwnerScreen} />
                <Route path="/races" component={RaceScreen} />
                <Route path="/species" component={SpeciesPage} />
                <Route path="/forbidden" component={ForbiddenPage} />
                <Route path="/unauthorized" component={UnauthorizedPage} />
                <Route path="/pets" exact component={PetsList} />
                <Route path="/profile/edit" component={EditProfilePage} />
                <Route path='/institutions' component={InstitutionsPage} />
                <Route path='/examinationTypes' component={ExaminationTypesPage} />
                <Route path="*" component={NotFoundPage} />
              </Switch>
            )}
          </Grid>
        </Grid>
      </BrowserRouter>
    </div>
  )
}

export default App
