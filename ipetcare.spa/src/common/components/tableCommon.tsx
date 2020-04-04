import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import MaterialTable, { Column } from 'material-table'

const useStyles = makeStyles({
  table: {
    margin: 20,
  },
})

interface TableProps {
  columns: Array<Column<any>>
  onDelete?: (data: any) => Promise<void>
  onEdit?: (newData: any) => Promise<void>
  onAdd?: (newData: any) => Promise<void>
  rows: any[]
  title: string
  isLoading: boolean
}

export const TableCommon = ({
  columns,
  rows,
  title,
  onAdd,
  onEdit,
  onDelete,
  isLoading,
}: TableProps) => {
  const styles = useStyles()

  return (
    <div className={styles.table}>
      <MaterialTable
        isLoading={isLoading}
        title={title}
        columns={columns}
        data={rows}
        editable={{
          onRowAdd: onAdd,
          onRowDelete: onDelete,
          onRowUpdate: onEdit,
        }}
        localization={{
          header: {
            actions: 'Akcje',
          },
          pagination: {
            labelRowsSelect: 'wierszy',
          },
          body: {
            editRow: {
              deleteText: 'Czy na pewno chcesz usunąć ten wpis?',
              cancelTooltip: 'anuluj',
              saveTooltip: 'usuń',
            },
            addTooltip: 'dodaj',
            deleteTooltip: 'usuń',
            editTooltip: 'edytuj',
          },
        }}
      />
    </div>
  )
}
