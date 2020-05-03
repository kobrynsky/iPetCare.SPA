import React, { useEffect, useState } from 'react'
import * as moment from 'moment'
import 'moment/locale/pl'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Calendar, momentLocalizer, DateLocalizer } from 'react-big-calendar'
import { Card } from '@material-ui/core'
import { CalendarToolbar } from '../components/calendarToolbar'

interface Event {
  id: number
  title: string
  start: Date
  end: Date
  allDay?: boolean
  resource?: any
}

export const CalendarPage = () => {
  const [localizer, setLocalizer] = useState(momentLocalizer(moment))

  useEffect(() => {
    setLocalizer(momentLocalizer(moment))
  }, [])

  return (
    <div style={{ marginTop: 50, padding: 20 }}>
      <Card>
        <Calendar
          style={{ height: 500 }}
          localizer={localizer}
          events={
            [
              {
                id: 0,
                start: new Date('5-05-2020 19:00'),
                end: new Date('5-05-2020 20:00'),
                title: 'Odrobaczanie',
              },
            ] as Event[]
          }
          popup
          components={{
            //@ts-ignore
            toolbar: CalendarToolbar,
          }}
        />
      </Card>
    </div>
  )
}
