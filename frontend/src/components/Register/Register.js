import React from 'react'
import Base from '../Elements/Base';
import FormUser from '../Elements/FormUser';

const Register = () => {
    return (
    <Base>
      <div className="d-flex align-items-center justify-content-center">
        <FormUser isLogin={false}/>
      </div>
    </Base>
    )
}

export default Register;