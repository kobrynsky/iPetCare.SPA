import React, { useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './index.css'
import { HomeScreen } from './homePage/homeScreen'
import { RegisterForm } from './auth/components/registerForm'
import { LoginForm } from './auth/components/loginForm'
import { useDispatch } from 'react-redux'
import { setUser } from './state/userActions'
import { getUserState } from './utils/localStorageHelper'
import { UserState } from './state/userReducer'
import { RaceForm } from './race/components/raceForm'
import { RaceDetails } from './race/components/raceDetails'
import { RaceList } from './race/components/raceList'

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
          <Route path="/race/create" component={RaceForm} />
          <Route
            path='/race/edit/:raceId'
            render={() => <RaceForm editing={true} />}
          />
          <Route path="/race/:raceId" component={RaceDetails} />
          <Route path="/races" component={RaceList} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
