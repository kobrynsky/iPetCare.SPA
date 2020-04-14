import React, { useEffect } from 'react'
import { Grid, Typography, TextField } from '@material-ui/core'
import { TableCommon } from '../../../common/components/tableCommon'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../state/store'
import { getRaces, createRace, updateRace, deleteRace } from '../../../state/races/racesActions'
import { getAllSpecies } from '../../../state/species/speciesActions'
import { getPets, getMyPets, deletePet, createPet, updatePet, getPet } from '../../../state/pets/petsActions'
import { Link, RouteComponentProps } from 'react-router-dom'

interface PetPageParams {
    petId: string;
}

export function PetPage(props: RouteComponentProps<PetPageParams>) {
    const dispatch = useDispatch()
    const petsState = useSelector((state: RootState) => state.pets)
    const racesState = useSelector((state: RootState) => state.races)
    // const examinationState = useSelector((state: RootSate) => state.examinations)

    useEffect(() => {
        dispatch(getPet(props.match.params.petId))
        dispatch(getRaces())
        dispatch(getAllSpecies())
    }, [])

    return (
        <div>
            {/* jakiś widok z badaniami, notkami, danymi itp */}
        </div>
    )
}