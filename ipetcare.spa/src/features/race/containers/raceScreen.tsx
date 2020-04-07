import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { ContentCard } from '../../../common/components/contentCard'
import { Link, NavLink } from 'react-router-dom'
import { TableCommon } from '../../../common/components/tableCommon'

export function RaceScreen() {
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
            isLoading={false}
            columns={[
              { title: 'Nazwa', field: 'name' },
              {
                title: 'Gatunek',
                field: 'speciesId',
                lookup: { 22: 'psy', 11: 'koty', 9999: 'jaszczurki' },
              },
            ]}
            rows={[
              { id: 1, name: 'rotweiler', speciesId: 22 },
              { id: 2, name: 'dachowiec', speciesId: 11 },
              { id: 3, name: 'salamandra', speciesId: 9999 },
              { id: 4, name: 'syjamski', speciesId: 11 },
            ]}
            onDelete={async data => {}}
            onAdd={async data => {
              console.log(data)
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
