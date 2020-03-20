import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '../../constants'
import '../race.css'
import { useParams } from 'react-router-dom'


export function RaceList() {
    const [races, setRaces] = useState([{ id: 0, name: "", specie: { id: 0, name: "" } }])
    useEffect(() => {
        axios.get(BASE_URL + '/races')
            .then(function (response) {
                console.log(response.data.races)
                setRaces(response.data.races)
            })
            .catch(error => console.log(error));
    }, []);

    return (
        <div>
            {races.map(race => (
                <div>
                    <h5><a href={`/race/${race.id}`}>{race.name}</a></h5>
                    <h5><a href={`/race/edit/${race.id}`}>Edytuj</a></h5>
                    <div>{race.id}</div>
                    <div>{race.specie?.name}</div>
                </div>
            ))}
        </div>
    )
}
