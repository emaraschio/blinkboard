import React, { Component } from 'react'
import axios from 'axios'

class BlinkForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: this.props.blink.title,
      description: this.props.blink.description
    }
  }

  handleInput = (e) => {
    this.props.resetNotification()
    this.setState({[e.target.name]: e.target.value})
  }

  handleBlur = () => {
    const blink = {
      title: this.state.title,
      description: this.state.description
    }

    axios.put(
      `http://localhost:3000/api/v1/blinks/${this.props.blink.id}`,
      {
        blink: blink
      })
    .then(response => {
      this.props.updateBlink(response.data)
    }).catch(error => console.log(error))
  }

  render() {
    return (
      <div className="title">
        <form onBlur={this.handleBlur} >
          <input className='input' type="text"
            name="title" placeholder='Enter a Title'
            value={this.state.title} onChange={this.handleInput} 
            ref={this.props.titleRef} />
          <textarea className='input' name="description"
            placeholder='Describe your blink'
            defaultValue={this.state.description} onChange={this.handleInput} />
        </form>
      </div>
    );
  }
}

export default BlinkForm