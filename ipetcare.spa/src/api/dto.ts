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
