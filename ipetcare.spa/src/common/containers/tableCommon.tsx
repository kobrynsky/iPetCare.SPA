import React from 'react'
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from '@material-ui/core'

interface Row {
  data: any[]
}

interface Props {
  onSave?: () => any
  onEdit?: () => any
  onAdd?: () => any
  columns: string[]
  rows: Row[]
}

export const TableCommon = ({ columns, rows }: Props) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map(c => (
              <TableCell align="center">{c}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(r => (
            <TableRow>
              {r.data.map(cell => (
                <TableCell align="center">{cell}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
