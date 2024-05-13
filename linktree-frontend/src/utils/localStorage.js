const setUser = (token) =>{
    localStorage.setItem("ltree-token", token);
}

const getUser = () =>{
    return localStorage.getItem("ltree-token");
}

const removeUser = () =>{
    localStorage.removeItem("ltree-token");
}

const setTheme = (theme) => localStorage.setItem("ltree-theme", theme);
const getTheme = () => localStorage.getItem("ltree-theme")

export {setUser, getUser, removeUser, setTheme, getTheme};