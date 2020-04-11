import { RACES_ACTIONS } from './races/racesActions'
import { PETS_ACTIONS } from './pets/petsActions'
import { USER_ACTIONS } from './user/userActions'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import reduxThunk, { ThunkMiddleware } from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { userReducer, UserState } from './user/userReducer'
import { petsReducer, PetsState } from './pets/petsReducer'
import { racesReducer, RacesState } from './races/racesReducer'
import { InstitutionsState, institutionsReducer } from './institutions/institutionsReducer'
import { INSTITUTIONS_ACTIONS } from './institutions/institutionsActions'

export interface RootState {
  readonly user: UserState
  readonly pets: PetsState
  readonly races: RacesState
  readonly institutions: InstitutionsState
}

const rootReducer = combineReducers<RootState>({
  user: userReducer,
  pets: petsReducer,
  races: racesReducer,
  institutions: institutionsReducer,
})

export type RootActions = USER_ACTIONS | PETS_ACTIONS | RACES_ACTIONS | INSTITUTIONS_ACTIONS

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(reduxThunk as ThunkMiddleware<RootState, RootActions>)
  )
)
