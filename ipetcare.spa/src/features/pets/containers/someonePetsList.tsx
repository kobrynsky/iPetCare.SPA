import React, { useEffect, useState, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../state/store'
import {
    getUserPets,
} from '../../../state/pets/petsActions'
import { getUserState } from '../../../utils/localStorageHelper'
import { PetDetails } from '../../../state/pets/petsReducer'
import { Typography, Grid, Box } from '@material-ui/core'
import { RouteComponentProps } from 'react-router-dom'
import { SimplePetCard } from '../components/simplePetCard'

interface SomeonePetsListPageParams {
    userId: string
}

export const SomeonePetsListPage = (
    props: RouteComponentProps<SomeonePetsListPageParams>
) => {
    const userId = props.match.params.userId
    const [] = useState(false)
    const [] = useState<string | undefined>('')
    const dispatch = useDispatch()
    const petsState = useSelector((state: RootState) => state.pets)

    useEffect(() => {
        dispatch(getUserPets(userId))
    }, [])

    return (
        <div className="container">
            <Fragment>
                <Box marginY={2}>
                    <Typography variant="h2">Zwierzaki</Typography>
                </Box>
                <Grid container spacing={3} justify="space-around">
                    {petsState.someonesItems.map((pet: PetDetails) => {
                        return (
                            <Grid key={pet.id} item xs={4}>
                                <SimplePetCard
                                    pet={pet}
                                    shared={true}
                                    userId={userId}
                                />
                            </Grid>
                        )
                    })}
                </Grid>
            </Fragment>
        </div>
    )
}
