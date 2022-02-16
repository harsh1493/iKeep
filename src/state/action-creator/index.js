//all actions are defined here with a type and payload(data) as input to reducer
export const changeMode =(mode)=>{
    return (dispatch)=>{
        dispatch({
            type:"switch",
            payload: mode
        })
    }
} 