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
import { CalendarPage } from './features/calendar/containers/calendarPage'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PrivateRoute from './utils/privateRoute'
import { ADMIN, OWNER, VET } from './utils/constants'
import ScrollToTop from './pageElements/containers/scrollToTop'
import { SomeonePetsListPage } from './features/pets/containers/someonePetsList'
import { PetInvitationsPage } from './features/pets/containers/petInvitations'
import { MyInvitationsPage } from './features/invitations/containers/myInvitationsPage'

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
            <Grid item style={{ maxWidth: '100%' }}>
              {loaded && (
                <Switch>
                  <Route path="/" component={HomeScreen} exact />
                  <Route path="/register" component={RegisterForm} />
                  <Route path="/login" component={LoginForm} />
                  <PrivateRoute
                    requiredRole={[ADMIN]}
                    path="/admin"
                    component={AdminScreen}
                  />
                  <PrivateRoute
                    requiredRole={[OWNER]}
                    path="/owner"
                    component={OwnerScreen}
                  />
                  <PrivateRoute
                    requiredRole={[VET]}
                    path="/vet"
                    component={VetScreen}
                  />
                  <PrivateRoute
                    requiredRole={[ADMIN]}
                    path="/races"
                    component={RacesPage}
                  />
                  <PrivateRoute
                    requiredRole={[ADMIN]}
                    path="/species"
                    component={SpeciesPage}
                  />
                  <PrivateRoute
                    requiredRole={[OWNER]}
                    path="/calendar"
                    component={CalendarPage}
                  />
                  <PrivateRoute
                    requiredRole={[OWNER, ADMIN, VET]}
                    path="/pets/:petId/notes/add"
                    component={AddNotePage}
                  />
                  <PrivateRoute
                    requiredRole={[OWNER, ADMIN, VET]}
                    path="/pets/:petId/notes/edit/:noteId"
                    component={EditNotePage}
                  />
                  <Route path="/pets/:petId/notes" component={PetNotesPage} />
                  <Route
                    exact
                    path='/pets/my/invitations'
                    component={MyInvitationsPage}
                  />
                  <Route
                    path='/pets/:petId/invitations' component={PetInvitationsPage}
                  />
                  <PrivateRoute
                    requiredRole={[OWNER, ADMIN, VET]}
                    path="/pets/:petId/notes"
                    component={PetNotesPage}
                  />
                  <PrivateRoute
                    requiredRole={[OWNER, ADMIN, VET]}
                    path="/pets/:petId/examinations/add"
                    component={AddExaminationPage}
                  />
                  <PrivateRoute
                    requiredRole={[OWNER, ADMIN, VET]}
                    path="/pets/:petId/examinations/:examinationId"
                    component={PetExaminationPage}
                  />
                  <PrivateRoute
                    requiredRole={[OWNER, ADMIN, VET]}
                    path="/pets/:petId/examinations"
                    component={PetExaminationsPage}
                  />
                  <Route
                    path="/users/:userId/pets"
                    component={SomeonePetsListPage}
                  />
                  <Route exact path="/pets/create" component={PetFormPage} />
                  <PrivateRoute
                    exact
                    path="/pets/create"
                    requiredRole={[OWNER]}
                    component={PetFormPage}
                  />
                  <PrivateRoute
                    requiredRole={[OWNER, ADMIN, VET]}
                    exact
                    path="/pets/:petId/edit"
                    component={PetFormPage}
                  />
                  <PrivateRoute
                    requiredRole={[OWNER, ADMIN, VET]}
                    exact
                    path="/pets/:petId"
                    component={PetPage}
                  />
                  <PrivateRoute
                    requiredRole={[OWNER, ADMIN, VET]}
                    exact
                    path="/pets"
                    component={PetList}
                  />

                  <PrivateRoute
                    requiredRole={[OWNER, ADMIN, VET]}
                    path="/profile/edit"
                    component={EditProfilePage}
                  />
                  <PrivateRoute
                    requiredRole={[OWNER, ADMIN, VET]}
                    path="/users/search"
                    component={UserSearchPage}
                  />
                  <PrivateRoute
                    requiredRole={[ADMIN]}
                    path="/institutions"
                    component={InstitutionsPage}
                  />
                  <PrivateRoute
                    requiredRole={[ADMIN]}
                    path="/examination/types"
                    component={ExaminationTypesPage}
                  />
                  <PrivateRoute
                    requiredRole={[ADMIN]}
                    path="/examination/parameters"
                    component={ExaminationParametersPage}
                  />

                  <Route path="/forbidden" component={ForbiddenPage} />
                  <Route path="/unauthorized" component={UnauthorizedPage} />
                  <PrivateRoute
                    requiredRole={[ADMIN]}
                    path="/users"
                    component={UsersPage}
                  />
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
