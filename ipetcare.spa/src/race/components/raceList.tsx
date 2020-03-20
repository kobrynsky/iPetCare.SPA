import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '../../constants'
import '../race.css'
import { useParams } from 'react-router-dom'
import RaceCard from './raceCard'
import { Box, Container, Grid, GridList, Theme, makeStyles, createStyles, GridListTile, ListSubheader, GridListTileBar, IconButton } from '@material-ui/core'


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        // root: {
        //     display: 'flex',
        //     flexWrap: 'wrap',
        //     justifyContent: 'space-around',
        //     overflow: 'hidden',
        //     backgroundColor: theme.palette.background.paper,
        // },
        // gridList: {
        //     width: "100%",
        //     height: "100%",
        // },
        // icon: {
        //     color: 'rgba(255, 255, 255, 0.54)',
        // },
    }),
);

export function RaceList() {
    const [races, setRaces] = useState([{ id: 0, name: "", species: { id: 0, name: "" } }])
    useEffect(() => {
        axios.get(BASE_URL + '/races')
            .then(function (response) {
                console.log(response.data.races)
                setRaces(response.data.races)
            })
            .catch(error => console.log(error));
    }, []);

    const classes = useStyles();
    return (
        <Container fixed>
            <Grid container justify="flex-start" spacing={2}>
                {
                    races.map(race => (
                        <Grid container item xs={4} spacing={0}>
                            <RaceCard race={race} />
                        </Grid>
                    ))
                }
            </Grid>
        </Container>

    )
}
