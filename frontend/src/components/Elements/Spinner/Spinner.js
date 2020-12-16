import React, { Component } from 'react'

function Spinner() {
    return (
      <div className="text-center spinner">
        <div className="spinner-border" role="status">
          <span className="sr-only">Carregando...</span>

        </div>
        <h4> Por favor aguarde ...</h4>
      </div>
    );
}

export default Spinner;