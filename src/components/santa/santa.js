import React from 'react';
import './santa.css';

const Santa = () => {
  return (
    <div className="container">
      <div className="window">
        <div className="santa">
          <div className="head">
            <div className="face">
              <div className="redhat">
                <div className="whitepart"></div>
                <div className="redpart"></div>
                <div className="hatball"></div>
              </div>
              <div className="eyes"></div>
              <div className="beard">
                <div className="nouse"></div>
                <div className="mouth"></div>
              </div>
            </div>
            <div className="ears"></div>
          </div>
          <div className="body"></div>
        </div>
      </div>
    </div>
  );
};

export default Santa;
