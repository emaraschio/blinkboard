import React from 'react'

const Blink = ({blink}) =>
  <div className="tile" key={blink.id}>
    <h4>{blink.title}</h4>
    <p>{blink.description}</p>
  </div>

export default Blink