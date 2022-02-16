const reducer = (state = "dark", action) => {
    if (action.type === "switch") {
        if (action.payload === "light") {
            state = "dark";
        }else {
            state = "light";
        }
        return state;
    }
    return state;
}

export default reducer;