import { useState } from "react";
import AuthContext from "./AuthContext";

const AuthState = (props) => {
  const host = "http://localhost:5000";

 
  //login
  const login=async(email,password)=>{
    console.log("loggin in");

    const response =await fetch(`${host}/api/auth/login`,{
        method:"POST",
        headers:{
            'Content-Type': 'application/json',
           // 'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFjYjRlNzA0MDY5NWYwMTAwNWJhZjg4In0sImlhdCI6MTY0MjE1NTM1MH0.lhUiJZ966QDtEx4NTvn9M2DpVmlF9Tf92Nzy9mLaFA8'
        },
        body:JSON.stringify({ email,password})
    });
    const json = await response.json()
    console.log(json);
    return json;

  }

  //login
  const signup=async(name,email,password)=>{
    console.log("loggin in");

    const response =await fetch(`${host}/api/auth/createUser`,{
        method:"POST",
        headers:{
            'Content-Type': 'application/json',
           // 'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFjYjRlNzA0MDY5NWYwMTAwNWJhZjg4In0sImlhdCI6MTY0MjE1NTM1MH0.lhUiJZ966QDtEx4NTvn9M2DpVmlF9Tf92Nzy9mLaFA8'
        },
        body:JSON.stringify({ name,email,password})
    });
    const json = await response.json()
    //console.log(json);
    return json;

  }


  return (

    <AuthContext.Provider value={{login,signup }}>
      {props.children}

    </AuthContext.Provider>
  );
}

export default AuthState;
