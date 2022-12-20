import '../../pages/demo/Demo.css';
import React from 'react';
import { Link } from 'react-router-dom';

const EditDeck = () => {
  return (
    <div className="container">
      <div className="error">
        <div className="box"></div>
        <h3>Work in progress</h3>
        <p>
          Things are a little <span>unstable</span> here
        </p>
        <p>I suggest come back later</p>
        <Link to="/">
          <p>
            <strong>Click here to go Home</strong>
          </p>
        </Link>
      </div>
    </div>
  );
};

export default EditDeck;
