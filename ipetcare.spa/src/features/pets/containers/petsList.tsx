import { Pet } from '../../../state/pets/petsReducer'
import { getPets } from '../../../state/pets/petsActions'
import React, { Component } from 'react'
import { PetsListItem } from '../components/petsListItem'
import { RootState } from '../../../state/store'
import { connect } from 'react-redux'
import _ from 'lodash'

export interface PetsListProps {
  pets: Pet[]
  getPets: () => any
}

class PetsList extends Component<PetsListProps> {
  componentDidMount(): void {
    this.props.getPets()
    console.log(this.props.pets)
  }

  renderPets(): JSX.Element[] | null {
    const { pets } = this.props
    if (!pets) {
      return null
    }
    return pets.map((pet: Pet, i: number) => {
      return <PetsListItem pet={pet} key={i} />
    })
  }

  render() {
    return <div>{this.renderPets()}</div>
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    pets: _.values(state.pets.items),
  }
}

export default connect(mapStateToProps, { getPets })(PetsList)
