import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import MaterialTable, { Column } from 'material-table'

const useStyles = makeStyles({})

interface TableProps {
  columns: Array<Column<any>>
  onDelete?: (data: any) => Promise<void>
  onEdit?: (newData: any) => Promise<void>
  onAdd?: (newData: any) => Promise<void>
  rows: any[]
  title: string
}

export const TableCommon = ({
  columns,
  rows,
  title,
  onAdd,
  onEdit,
  onDelete,
}: TableProps) => {
  const styles = useStyles()

  return (
    <MaterialTable
      title={title}
      columns={columns}
      data={rows}
      editable={{
        onRowAdd: onAdd,
        onRowDelete: onDelete,
        onRowUpdate: onEdit,
      }}
    />
  )
}
