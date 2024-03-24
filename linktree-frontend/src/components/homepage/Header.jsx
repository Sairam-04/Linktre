import React from "react";

const Header = () => {
  return (
    <div className="header w-full h-[9vh] bg-black flex justify-between items-center">
      <div className="logo w-1/2">Logo</div>
      <ul className="navmenu w-1/2 flex gap-10 justify-end">
        <li>Home</li>
        <li>Features</li>
        <li>Links</li>
        <li>Appearance</li>
        <li>Login</li>
      </ul>
    </div>
  );
};

export default Header;
