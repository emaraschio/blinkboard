import React, { Component } from 'react'
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
          return(
            <div className="tile" key={blink.id} >
              <h4>{blink.title}</h4>
              <p>{blink.description}</p>
            </div>
          )
        })}
      </div>
    );
  }

}

export default BlinksContainer