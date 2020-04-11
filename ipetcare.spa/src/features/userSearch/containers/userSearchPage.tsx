import React from 'react'
import { UserResult } from '../components/userResult'

export const UserSearchPage = () => {
  return (
    <div>
      <UserResult
        lastName="Borowski"
        firstName="Piotr"
        email="pb@gmail.com"
        imageUrl="https://www.wprost.pl/_thumb/5f/09/909272231d1fcb0bd2a3bcd3d8c3.jpeg"
        placeOfResidence="Wrocław jakas 2/1"
        specialization="stomatolog"
        title="lek"
      />
    </div>
  )
}
