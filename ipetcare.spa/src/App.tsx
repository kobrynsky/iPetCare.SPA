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
import { AdminScreen } from './features/homePage/containers/adminScreen'
import { OwnerScreen } from './features/homePage/containers/ownerScreen'
import { RacesPage } from './features/race/containers/racesPage'
import { SpeciesPage } from './features/species/containers/speciesPage'
import { EditProfilePage } from './features/profile/containers/editProfilePage'
import { NotFoundPage } from './common/errorPages/notFoundPage'
import { ForbiddenPage } from './common/errorPages/forbiddenPage'
import { UnauthorizedPage } from './common/errorPages/unauthorizedPage'
import { UserSearchPage } from './features/userSearch/containers/userSearchPage'
import { InstitutionsPage } from './features/institutions/containers/institutionsPage'
import { ExaminationTypesPage } from './features/examinations/containers/examinationTypesPage'
import { ExaminationParametersPage } from './features/examinations/containers/examinationParametersPage'
import { PetsPage } from './features/pets/containers/petsPage'
import { PetPage } from './features/pets/containers/petPage'
import { AddNotePage } from './features/notes/containers/addNotePage'
import { PetNotesPage } from './features/notes/containers/petNotesPage'
import { EditNotePage } from './features/notes/containers/editNotePage'
import { AddExaminationPage } from './features/examinations/containers/addExaminationPage'

const App: React.FC = () => {
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.user.user)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(false)
    if (user.token === '') {
      const userState = getUserState()
      if (userState) {
        dispatch(setUser(userState))
      }
    }

    setLoaded(true)
  }, [])

  const header =
    user.userName && user.userName.length > 0 ? (
      <LoggedInNavbar />
    ) : (
        <>
          <NavLink className="titleContainerNotLogged" to="/">
            <Typography className="title" variant="h5">
              iPetCare
          </Typography>
          </NavLink>
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
                <Route path="/races" component={RacesPage} />
                <Route path="/species" component={SpeciesPage} />
                <Route path="/pets/:petId/notes/add" component={AddNotePage} />
                <Route path="/pets/:petId/notes/edit/:noteId" component={EditNotePage} />
                <Route path="/pets/:petId/notes" component={PetNotesPage} />

                <Route path="/pets/:petId/examinations/add" component={AddExaminationPage} />

                <Route path="/pets/details/:petId" component={PetPage} />
                <Route path="/pets" component={PetsPage} />

                <Route path="/profile/edit" component={EditProfilePage} />
                <Route path="/users/search" component={UserSearchPage} />
                <Route path="/institutions" component={InstitutionsPage} />
                <Route
                  path="/examination/types"
                  component={ExaminationTypesPage}
                />
                <Route
                  path="/examination/parameters"
                  component={ExaminationParametersPage}
                />

                <Route path="/forbidden" component={ForbiddenPage} />
                <Route path="/unauthorized" component={UnauthorizedPage} />
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
