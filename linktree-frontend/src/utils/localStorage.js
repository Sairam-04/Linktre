const setUser = (token) =>{
    localStorage.setItem("ltree-token", token);
}

const getUser = () =>{
    return localStorage.getItem("ltree-token");
}

const removeUser = () =>{
    localStorage.removeItem("ltree-token");
}

const setTheme = (theme) => localStorage.setItem("ltree-theme", "dark");
const getTheme = () => localStorage.getItem("ltree-theme")

export {setUser, getUser, removeUser, setTheme, getTheme};