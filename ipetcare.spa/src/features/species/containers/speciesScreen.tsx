import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { ContentCard } from '../../../common/components/contentCard'
import { Link, NavLink } from 'react-router-dom'
import { TableCommon } from '../../../common/components/tableCommon'

export function SpeciesScreen() {
  return (
    <div>
      <Grid container direction="column">
        <Grid item>
          <Typography variant="h1" className="title">
            Gatunki
          </Typography>
        </Grid>
        <Grid item>
          <TableCommon
            title="tabela"
            isLoading={false}
            columns={[{ title: 'Nazwa', field: 'name' }]}
            rows={[
              { id: 1, name: 'psy' },
              { id: 2, name: 'koty' },
              { id: 3, name: 'konie' },
              { id: 4, name: 'chomiki' },
            ]}
            onDelete={async data => {
              console.log(data)
            }}
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
