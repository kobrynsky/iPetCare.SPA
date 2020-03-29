import React from 'react'
import { Pet } from '../../state/pets/petsReducer'

interface PetListItemProps {
  pet: Pet
}

export const PetsListItem = ({ pet }: PetListItemProps) => (
  <div>
    {pet.id}
    {pet.imageUrl}
    {pet.name}
    {pet.weight}
    {pet.height}
    {pet.birthDate}
    {pet.raceId}
    {pet.gender}
  </div>
)
