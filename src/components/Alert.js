import React,{useContext} from 'react';
import alertContext from '../context/Alert/AlertContext';

const Alert = () => {
  const context = useContext(alertContext);
  const {alert} = context;


  return (
    alert ? <div className={`alert alert-${alert.type} alert-dismissible fade show pb-4`} role="alert">
    {alert.msg}
</div>:<div className='h-20'></div>
  );
};

export default Alert;
