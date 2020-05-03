import React, { useEffect, useState } from 'react'
import * as moment from 'moment'
import 'moment/locale/pl'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Calendar, momentLocalizer, DateLocalizer } from 'react-big-calendar'
import { Card, CircularProgress } from '@material-ui/core'
import { CalendarToolbar } from '../components/calendarToolbar'
import { useDispatch, useSelector } from 'react-redux'
import { getImportantDates } from '../../../state/importantDates/importantDatesActions'
import { RootState } from '../../../state/store'
import { ImportantDate } from '../../../api/dto'

interface Event {
  id: string
  title: string
  start: Date
  end: Date
  allDay?: boolean
  resource?: any
}

export const CalendarPage = () => {
  const dispatch = useDispatch()
  const dates = useSelector((state: RootState) => state.importantDates)
  const [localizer, setLocalizer] = useState(momentLocalizer(moment))

  useEffect(() => {
    setLocalizer(momentLocalizer(moment))
    dispatch(getImportantDates())
  }, [])

  useEffect(() => {
    console.log(dates)
  }, [dates])

  return (
    <div style={{ marginTop: 50, padding: 20 }}>
      <Card>
        {dates.loading ? (
          <CircularProgress style={{ alignSelf: 'center' }} />
        ) : (
          <Calendar
            style={{ height: 500 }}
            localizer={localizer}
            events={
              Array.prototype
                .concat(dates.pastDates, dates.upcomingDates)
                .map((d: ImportantDate) => ({
                  id: d.id,
                  start: new Date(d.importantDate),
                  end: new Date(d.importantDate),
                  title: d.payload,
                  allDay: true,
                })) as Event[]
            }
            popup
            components={{
              //@ts-ignore
              toolbar: CalendarToolbar,
            }}
          />
        )}
      </Card>
    </div>
  )
}
