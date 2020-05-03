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
import { VetScreen } from './features/homePage/containers/vetScreen'
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
import { PetList } from './features/pets/containers/petList'
import { PetPage } from './features/pets/containers/petPage'
import { AddNotePage } from './features/notes/containers/addNotePage'
import { PetNotesPage } from './features/notes/containers/petNotesPage'
import { EditNotePage } from './features/notes/containers/editNotePage'
import { AddExaminationPage } from './features/examinations/containers/addExaminationPage'
import { PetExaminationsPage } from './features/examinations/containers/petExaminationsPage'
import { PetExaminationPage } from './features/examinations/containers/petExaminationPage'
import { PetFormPage } from './features/pets/containers/petFormPage'
import PetsIcon from '@material-ui/icons/Pets'
import { UsersPage } from './features/users/containers/usersPage'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ScrollToTop from './pageElements/containers/scrollToTop'

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
            <Typography className="title peru" variant="h5">
              <PetsIcon fontSize="small" />
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
          <ScrollToTop>
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
                  <Route path="/vet" component={VetScreen} />
                  <Route path="/races" component={RacesPage} />
                  <Route path="/species" component={SpeciesPage} />
                  <Route path="/pets/:petId/notes/add" component={AddNotePage} />
                  <Route
                    path="/pets/:petId/notes/edit/:noteId"
                    component={EditNotePage}
                  />
                  <Route path="/pets/:petId/notes" component={PetNotesPage} />
                  <Route
                    path="/pets/:petId/examinations/add"
                    component={AddExaminationPage}
                  />
                  <Route
                    path="/pets/:petId/examinations/:examinationId"
                    component={PetExaminationPage}
                  />
                  <Route
                    path="/pets/:petId/examinations"
                    component={PetExaminationsPage}
                  />
                  <Route exact path="/pets/create" component={PetFormPage} />
                  <Route exact path="/pets/:petId/edit" component={PetFormPage} />
                  <Route exact path="/pets/:petId" component={PetPage} />
                  <Route exact path="/pets" component={PetList} />

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
                  <Route path="/users" component={UsersPage} />
                  <Route path="*" component={NotFoundPage} />
                </Switch>
              )}
            </Grid>
          </ScrollToTop>
        </Grid>
      </BrowserRouter>
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_RIGHT} />
    </div>
  )
}

export default App
