import { PetsAction } from './actions/petsActions'
import { USER_ACTIONS } from './state/userActions'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import reduxThunk, { ThunkMiddleware } from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { userReducer, UserState } from './state/userReducer'
import { petsReducer, PetsState } from './reducers/petsReducer'

export interface RootState {
  readonly user: UserState
  readonly pets: PetsState
}

const rootReducer = combineReducers<RootState>({
  user: userReducer,
  pets: petsReducer,
})

export type RootActions = USER_ACTIONS | PetsAction // | CommentsAction | etc.

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(reduxThunk as ThunkMiddleware<RootState, RootActions>)
  )
)
