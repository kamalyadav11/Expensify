import React from 'react';

const Port = (props) => (
  <div>
    <h1>A Thing I have done.</h1>
    <p>This Page is for the item {props.match.params.id}</p>
  </div>
);

export default Port;