const setUser = (token) =>{
    localStorage.setItem("ltree-token", token);
}

const getUser = () =>{
    return localStorage.getItem("ltree-token");
}

const removeUser = () =>{
    localStorage.removeItem("ltree-token");
}

export {setUser, getUser, removeUser};