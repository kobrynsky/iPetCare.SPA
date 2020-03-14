import { combineReducers, createStore, AnyAction, Store } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension'
import { userReducer, UserState } from './state/userReducer'

export interface StoreState {
  user: UserState
}

/* Create root reducer, containing all features of the application */
const rootReducer = combineReducers({
  user: userReducer,
})

const store: Store<StoreState, AnyAction> = createStore(
  rootReducer,
  /* preloadedState, */ devToolsEnhancer({})
)

export default store
