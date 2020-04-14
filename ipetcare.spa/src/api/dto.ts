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

export type SortBy =
  | ''
  | 'SortByLastNameAsc'
  | 'SortByLastNameDesc'
  | 'SortBySpecializationAsc'
  | 'SortBySpecializationDesc'

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
  getVetsSortBy?: SortBy
}

export interface GetSearchResponseDto {
  query: string
  page: number
  pageSize: number
  totalItems: number
  sortBy: SortBy
  vets?: Vet[]
  owners?: Owner[]
}
