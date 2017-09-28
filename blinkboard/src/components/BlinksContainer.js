import React, { Component } from 'react'
import Idea from './Idea'
import axios from 'axios'

class BlinksContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      blinks: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3000/api/v1/blinks.json')
    .then(response => {
      console.log(response)
      this.setState({blinks: response.data})
    })
    .catch(error => console.log(error))
  }

  render() {
    return (
      <div>
        {this.state.blinks.map((blink) => {
          return (<Blink blink={blink} key={blink.id} />)
        })}
      </div>
    );
  }

}

export default BlinksContainer