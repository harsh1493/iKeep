import React,{useContext} from 'react';
import alertContext from '../context/Alert/AlertContext';

const Alert = () => {
  const context = useContext(alertContext);
  const {alert} = context;


  return (
    alert && <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
    {alert.msg}
</div>
  );
};

export default Alert;
