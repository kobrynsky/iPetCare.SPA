import { RACES_ACTIONS } from './races/racesActions'
import { PETS_ACTIONS } from './pets/petsActions'
import { USER_ACTIONS } from './user/userActions'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import reduxThunk, { ThunkMiddleware } from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { userReducer, UserState } from './user/userReducer'
import { petsReducer, PetsState } from './pets/petsReducer'
import { racesReducer, RacesState } from './races/racesReducer'
import { InstitutionsState, institutionsReducer } from './institutions/institutionsReducer'
import { INSTITUTIONS_ACTIONS } from './institutions/institutionsActions'
import { examinationTypesReducer, ExaminationTypesState } from './examinationTypes/examinationTypesReducer'
import { EXAMINATION_TYPES_ACTIONS } from './examinationTypes/examinationTypesActions'
import { SpeciesState, speciesReducer } from './species/speciesReducer'
import { SPECIES_ACTIONS } from './species/speciesActions'
import { examinationParametersReducer, ExaminationParametersState } from './examinationParameters/examinationParametersReducer'
import { EXAMINATION_PARAMETERS_ACTIONS } from './examinationParameters/examinationParametersActions'

export interface RootState {
  readonly user: UserState
  readonly pets: PetsState
  readonly races: RacesState
  readonly institutions: InstitutionsState
  readonly examinationTypes: ExaminationTypesState
  readonly examinationParameters: ExaminationParametersState
  readonly species: SpeciesState
}

const rootReducer = combineReducers<RootState>({
  user: userReducer,
  pets: petsReducer,
  races: racesReducer,
  institutions: institutionsReducer,
  examinationTypes: examinationTypesReducer,
  examinationParameters: examinationParametersReducer,
  species: speciesReducer
})

export type RootActions = USER_ACTIONS | PETS_ACTIONS | RACES_ACTIONS | INSTITUTIONS_ACTIONS | EXAMINATION_TYPES_ACTIONS | SPECIES_ACTIONS | EXAMINATION_PARAMETERS_ACTIONS

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(reduxThunk as ThunkMiddleware<RootState, RootActions>)
  )
)
