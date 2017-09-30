import React, { Component } from 'react'
import axios from 'axios'
import Blink from './Blink'
import BlinkForm from './BlinkForm'
import update from 'immutability-helper'
import Notification from './Notification'

class BlinksContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      blinks: [],
      editingBlinkId: null,
      notification: '',
      transitionIn: false
    }
  }

  componentDidMount = () => {
    axios.get('http://localhost:3000/api/v1/blinks.json')
    .then(response => {
      this.setState({blinks: response.data})
    }).catch(error => console.log(error))
  }

  addNewBlink = () => {
    axios.post(
      'http://localhost:3000/api/v1/blinks',
      { blink:
        {
          title: '',
          description: ''
        }
      }
    )
    .then(response => {
      const blinks = update(this.state.blinks, {
        $splice: [[0, 0, response.data]]
      })
      this.setState({
        blinks: blinks,
        editingBlinkId: response.data.id
      })
    }).catch(error => console.log(error))
  }

  updateBlink = (blink) => {
    const blinkIndex = this.state.blinks.findIndex(x => x.id === blink.id)
    const blinks = update(this.state.blinks, {
      [blinkIndex]: { $set: blink }
    })
    this.setState({blinks: blinks, notification: 'All changes saved', transitionIn: true})
  }

  deleteBlink = (id) => {
    axios.delete(`http://localhost:3000/api/v1/blinks/${id}`)
    .then(response => {
      const blinkIndex = this.state.blinks.findIndex(x => x.id === id)
      const blinks = update(this.state.blinks, { $splice: [[blinkIndex, 1]]})
      this.setState({blinks: blinks})
    })
    .catch(error => console.log(error))
  }

  resetNotification = () => {
    this.setState({notification: '', transitionIn: false})
  }

  enableEditing = (id) => {
    this.setState({editingBlinkId: id}, () => { this.title.focus() })
  }

  render() {
    return (
      <div>
        <div>
          <button className="addBlinkButton" onClick={this.addNewBlink}>
            Add Blink
          </button>
          <Notification in={this.state.transitionIn} notification={this.state.notification} />
        </div>
        {this.state.blinks.map((blink) => {
          if (this.state.editingBlinkId === blink.id) {
            return (<BlinkForm blink={blink} key={blink.id} updateBlink={this.updateBlink} titleRef={input => this.title = input} resetNotification={this.resetNotification} />)
          } else {
            return (<Blink blink={blink} key={blink.id} onClick={this.enableEditing} onDelete={this.deleteBlink} />)
          }
        })}
      </div>
    );
  }

}

export default BlinksContainer