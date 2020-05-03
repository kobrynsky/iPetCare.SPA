//@ts-nocheck
import React from 'react'
import Toolbar from 'react-big-calendar/lib/Toolbar'
import { ButtonGroup, Button } from '@material-ui/core'
import '../calendar.css'

export class CalendarToolbar extends Toolbar {
  componentDidMount() {
    const view = this.props.view
    console.log(view)
  }

  render() {
    return (
      <div className="calendarToolbar">
        <ButtonGroup color="primary" fullWidth>
          <Button type="button" onClick={this.view.bind(null, 'month')}>
            Miesiąc
          </Button>
          <Button type="button" onClick={this.view.bind(null, 'week')}>
            Tydzień
          </Button>
          <Button type="button" onClick={this.view.bind(null, 'day')}>
            Dzień
          </Button>
          <Button type="button" onClick={this.view.bind(null, 'agenda')}>
            Agenda
          </Button>
        </ButtonGroup>

        <div style={{ textAlign: 'center' }}>
          <h4>{this.props.label}</h4>
        </div>
        <ButtonGroup color="primary" fullWidth>
          <Button type="button" onClick={() => this.navigate('PREV')}>
            Wcześniej
          </Button>
          <Button type="button" onClick={() => this.navigate('TODAY')}>
            Dziś
          </Button>
          <Button type="button" onClick={() => this.navigate('NEXT')}>
            Później
          </Button>
        </ButtonGroup>
      </div>
    )
  }
}
