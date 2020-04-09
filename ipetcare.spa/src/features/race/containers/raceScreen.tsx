import React, { useEffect } from 'react'
import { Grid, Typography } from '@material-ui/core'
import { ContentCard } from '../../../common/components/contentCard'
import { Link, NavLink } from 'react-router-dom'
import { TableCommon } from '../../../common/components/tableCommon'
import { RootState } from '../../../state/store'
import { useSelector, useDispatch } from 'react-redux'
import { getRaces, createRace } from '../../../state/races/racesActions'
import { Race } from '../../../state/races/racesReducer'

export function RaceScreen() {
  const dispatch = useDispatch()
  const racesState = useSelector((state: RootState) => state.races)

  useEffect(() => {
    dispatch(getRaces())
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
                lookup: { 22: 'psy', 11: 'koty', 9999: 'jaszczurki' },
              },
            ]}
            rows={racesState.items}
            onDelete={async data => {}}
            onAdd={async data => {
              console.log(data)
              dispatch(
                createRace({
                  name: data.name,
                  speciesId: parseInt(data.speciesId),
                })
              )
            }}
            onEdit={async data => {
              console.log(data)
            }}
          />
        </Grid>
      </Grid>
    </div>
  )
}
