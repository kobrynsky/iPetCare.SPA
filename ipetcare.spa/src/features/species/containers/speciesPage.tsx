import React, { useEffect } from 'react'
import { Grid, Typography } from '@material-ui/core'
import { TableCommon } from '../../../common/components/tableCommon'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../state/store'
import { getAllSpecies, deleteSpecies, updateSpecies, createSpecies } from '../../../state/species/speciesActions'

export function SpeciesPage() {
  const dispatch = useDispatch()
  const speciesState = useSelector((state: RootState) => state.species)

  useEffect(() => {
    dispatch(getAllSpecies())
  }, [])

  return (
    <div>
      <Grid container direction="column">
        <Grid item>
          <Typography variant="h2" className="title">
            Gatunki
          </Typography>
        </Grid>
        <Grid item>
          <TableCommon
            title="Gatunki"
            isLoading={speciesState.loading}
            columns={[{ title: 'Nazwa', field: 'name' }]}
            rows={speciesState.items}
            onDelete={async data => {
              dispatch(deleteSpecies(data.id))
            }}
            onAdd={async data => {
              dispatch(
                createSpecies({
                  name: data.name,
                })
              )
            }}
            onEdit={async data => {
              dispatch(
                updateSpecies({
                  id: data.id,
                  name: data.name,
                })
              )
            }}
          />
        </Grid>
      </Grid>
    </div>
  )
}
