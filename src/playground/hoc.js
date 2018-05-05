import React from 'react';
import ReactDOM from 'react-dom';
console.log("In the hoc");

const Info = (props) => (
  <div>
    <h1>Info</h1>
    <p>The info is {props.info}</p>
  </div>
);

const withAdminWarning = (WrappedComponent) => {
  return (props) => (     //returns a new component
    <div>
      {props.isAdmin && <p>This is Secret Info</p>}
      <WrappedComponent {...props}/> {/*all the props pass will get spread, in this case info=nothing*/}
    </div>
  )    
}

const AdminInfo = withAdminWarning(Info); // hoc

ReactDOM.render(<AdminInfo isAdmin={true} info="Nothing"/>, document.getElementById('app'));