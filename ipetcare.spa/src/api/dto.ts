export interface LoginProps {
  email: string
  password: string
}

export interface RegisterProps {
  firstName: string
  lastName: string
  userName: string
  email: string
  password: string
  role: 'Owner' | 'Vet' | 'Admin'
}

export type SortBy = SortByVets | SortByOwners

export type SortByVets =
  | ''
  | 'SortByLastNameAsc'
  | 'SortByLastNameDesc'
  | 'SortBySpecializationAsc'
  | 'SortBySpecializationDesc'

export type SortByOwners =
  | ''
  | 'SortByLastNameAsc'
  | 'SortByLastNameDesc'
  | 'SortByPlaceOfResidenceAsc'
  | 'SortByPlaceOfResidenceDesc'

export interface Institution {
  id: string
  name: string
  address: string
}

export interface UserBase {
  id: string
  firstName: string
  lastName: string
  email: string
  role: string
}

export interface Vet extends UserBase {
  specialization: string
  institutions: Institution[]
}

export interface Owner extends UserBase {
  placeOfResidence: string
}

export interface GetSearchDto {
  query: string
  page?: number
  pageSize?: number
  sortBy?: SortByVets | SortByOwners
}

export interface GetSearchResponseDto {
  query: string
  page: number
  pageSize: number
  totalItems: number
  sortBy: SortByVets | SortByOwners
  vets?: Vet[]
  owners?: Owner[]
  currentSearchingUserRole: string
}

export interface ImportantDate {
  id: string
  payload: string
  createdAt: string
  importantDate: string
  petId: string
}

export interface ImportantDatesResponseDto {
  upcomingDates: ImportantDate[]
  pastDates: ImportantDate[]
}
