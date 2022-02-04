import { useState } from "react";
import AlertContext from "./AlertContext";
const AlertState=(props)=>{

  const alertDefault= {
    msg:"",
    type:""
  };
  const [alert, setAlert] = useState(alertDefault);
  const showAlert=(message,type)=>{
    setAlert({
      msg:message,
      type:type
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500); 
  }
    return(

        <AlertContext.Provider value={{alert,showAlert}}>
           {props.children}

        </AlertContext.Provider>
    );
}

export default AlertState;
