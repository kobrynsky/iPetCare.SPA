import React, { useEffect } from 'react'
import { Grid, Typography, TextField } from '@material-ui/core'
import { TableCommon } from '../../../common/components/tableCommon'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../state/store'
import {
  getRaces,
  createRace,
  updateRace,
  deleteRace,
} from '../../../state/races/racesActions'
import { getAllSpecies } from '../../../state/species/speciesActions'
import {
  getPets,
  getMyPets,
  deletePet,
  createPet,
  updatePet,
} from '../../../state/pets/petsActions'
import { Link } from 'react-router-dom'

export function PetsPage() {
  const dispatch = useDispatch()
  const petsState = useSelector((state: RootState) => state.pets)
  const speciesState = useSelector((state: RootState) => state.species)
  const racesState = useSelector((state: RootState) => state.races)

  useEffect(() => {
    dispatch(getMyPets())
  }, [])

  useEffect(() => {
    dispatch(getRaces())
  }, [])

  useEffect(() => {
    dispatch(getAllSpecies())
  }, [])

  return (
    <div>
      <Grid container direction="column">
        <Grid item>
          <Typography variant="h1" className="title">
            Moje Zwierzęta
          </Typography>
        </Grid>
        <Grid item>
          <TableCommon
            title="Moje Zwierzęta"
            isLoading={petsState.loading}
            columns={[
              {
                title: 'Nazwa',
                field: 'name',
                render: row => (
                  <Link to={`/pets/details/${row.id}`}>{row.name}</Link>
                ),
              },
              { title: 'Masa [kg]', field: 'weight' },
              { title: 'Wysokość [cm]', field: 'height' },
              {
                title: 'Płeć',
                field: 'gender',
                lookup: { Male: 'samiec', Female: 'samica' },
              },
              {
                title: 'Rasa',
                field: 'raceId',
                lookup: racesState.items.reduce(
                  (a, x) => ({ ...a, [x.id as number]: x.name }),
                  {}
                ),
              },
              {
                title: 'Data urodzenia',
                field: 'birthDate',
              },
            ]}
            rows={petsState.items}
            onDelete={async data => {
              dispatch(deletePet(data.id))
            }}
            onAdd={async data => {
              //   dispatch()
              // createPet({
              //     name: data.name,
              //     weight: parseInt(data.weight),
              //     height: parseInt(data.height),
              //     gender: data.gender,
              //     birthDate: data.birthDate,
              //     raceId: parseInt(data.raceId),
              //     imageUrl: ""
              // })
            }}
            onEdit={async data => {
              //   dispatch(
              //     updatePet({
              //       id: data.id,
              //       name: data.name,
              //       weight: parseInt(data.weight),
              //       height: parseInt(data.height),
              //       gender: data.gender,
              //       birthDate: data.birthDate,
              //       raceId: parseInt(data.raceId),
              //     //   imageUrl: '',
              //     })
              //   )
            }}
          />
        </Grid>
      </Grid>
    </div>
  )
}
