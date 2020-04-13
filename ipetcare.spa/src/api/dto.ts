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

export interface Vet {
  firstName: string
  lastName: string
  email: string
  role: string
  specialization: string
  id: string
  institutions: Institution[]
}

export interface GetVetsSearchDto {
  query: string
  page?: number
  pageSize?: number
  getVetsSortBy?: SortBy
}

export interface GetVetsSearchResponseDto {
  query: string
  page: number
  pageSize: number
  totalItems: number
  sortBy: SortBy
  vets: Vet[]
}
