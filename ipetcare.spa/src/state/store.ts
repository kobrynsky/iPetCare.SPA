import { PetsAction } from './pets/petsActions'
import { USER_ACTIONS } from './user/userActions'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import reduxThunk, { ThunkMiddleware } from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { userReducer, UserState } from './user/userReducer'
import { petsReducer, PetsState } from './pets/petsReducer'

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
