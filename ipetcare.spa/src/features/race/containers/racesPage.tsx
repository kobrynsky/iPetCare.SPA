import React, { useEffect } from 'react'
import { Grid, Typography } from '@material-ui/core'
import { TableCommon } from '../../../common/components/tableCommon'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../state/store'
import { getRaces, createRace, updateRace, deleteRace } from '../../../state/races/racesActions'
import { getAllSpecies } from '../../../state/species/speciesActions'

export function RacesPage() {
  const dispatch = useDispatch()
  const racesState = useSelector((state: RootState) => state.races)
  const speciesState = useSelector((state: RootState) => state.species)

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
            Rasy
          </Typography>
        </Grid>
        <Grid item>
          <TableCommon
            title="Rasy"
            isLoading={racesState.loading}
            columns={[
              { title: 'Nazwa', field: 'name' },
              {
                title: 'Gatunek',
                field: 'speciesId',
                lookup: speciesState.items.reduce((a, x) => ({ ...a, [x.id as number]: x.name }), {})
              },
            ]}
            rows={racesState.items}
            onDelete={async data => {
              dispatch(deleteRace(data.id))
            }}
            onAdd={async data => {
              dispatch(
                createRace({
                  name: data.name,
                  speciesId: parseInt(data.speciesId)
                })
              )
            }}
            onEdit={async data => {
              dispatch(
                updateRace({
                  id: data.id,
                  name: data.name,
                  speciesId: parseInt(data.speciesId)
                })
              )
            }}
          />
        </Grid>
      </Grid>
    </div>
  )
}