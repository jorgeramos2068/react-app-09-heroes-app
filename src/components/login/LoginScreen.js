import React, {useContext} from 'react';
import AuthContext from '../../auth/AuthContext';
import types from '../../types/types';

const LoginScreen = ({history}) => {
  const {dispatch} = useContext(AuthContext);

  const handleLogin = () => {
    const lastPath = localStorage.getItem('lastPath') || '/';
    const user = {
      name: 'Batman'
    };
    const action = {
      type: types.login,
      payload: user
    }
    dispatch(action);
    history.push(lastPath);
  }

  return (
    <div className="container mt-5">
      <h1>Login</h1>
      <hr />
      <button
        className="btn btn-primary"
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  );
};

export default LoginScreen;
