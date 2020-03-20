import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '../../constants'
import '../race.css'
import { useParams } from 'react-router-dom'


interface IRaceDetails {
    id: number,
    name: string,
    specie: { id: number, name: number }
}


export function RaceDetails() {
    const [race, setRace] = useState({ id: 0, name: "", specie: { id: 0, name: "" } })
    let { raceId } = useParams()
    useEffect(() => {
        axios.get(BASE_URL + '/races/' + raceId)
            .then(function (response) {
                setRace(response.data)
            })
            .catch(error => console.log(error));
    }, []);

    return (
        <div>
            {race.id}
            {race.name}
            {race.specie?.id}
            {race.specie?.name}
        </div>
    )
}
