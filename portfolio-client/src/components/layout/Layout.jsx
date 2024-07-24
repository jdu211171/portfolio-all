import React, { useState, useEffect } from "react";
import { Outlet, NavLink } from "react-router-dom";

//icons
import { ReactComponent as NavButtonIcon } from "../../assets/icons/navButton.svg";
import { ReactComponent as HomeIcon } from "../../assets/icons/home.svg";
import { ReactComponent as StudentIcon } from "../../assets/icons/student.svg";
import { ReactComponent as UserPlusIcon } from "../../assets/icons/userPlus.svg";
import { ReactComponent as SettingsIcon } from "../../assets/icons/settings.svg";
import { ReactComponent as HelpIcon } from "../../assets/icons/help.svg";
import { ReactComponent as LogOutIcon } from "../../assets/icons/logOut.svg";

import logo from "/src/assets/logo.png";
import style from "./Layout.module.css";

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [smallScreen, setSmallScreen] = useState(false);
  const handleResize = () => {
    setSmallScreen(window.innerWidth > 768);
    setIsMenuOpen(window.innerWidth > 768);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    // Initial check
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleNavButtonClick = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <div className={isMenuOpen ? style.menuOpen : style.menuClose}>
      <div className={style.topBar}>
        <div className={style.left}>
          <div className={style.logo}>
            <div>
              <img src={logo} alt="Logo" />
            </div>
            <div>JDU Portfolio</div>
          </div>
        </div>
        <div className={style.right}>
          <div className={style.navButton} onClick={handleNavButtonClick}>
            <NavButtonIcon />
          </div>
        </div>
      </div>
      <div className={style.sideBar}>
        <header className={style.left}>
          <nav>
            <ul>
              <span className={style.navGroup}>GENERAL</span>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) => (isActive ? style.active : "")}
                >
                  <HomeIcon />
                  <div>Home</div>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/student"
                  className={({ isActive }) => (isActive ? style.active : "")}
                >
                  <StudentIcon />
                  <div>学生検索</div>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/staff"
                  className={({ isActive }) => (isActive ? style.active : "")}
                >
                  <UserPlusIcon />
                  <div>職員</div>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/recruiter"
                  className={({ isActive }) => (isActive ? style.active : "")}
                >
                  <UserPlusIcon />
                  <div>リクレーター</div>
                </NavLink>
              </li>
            </ul>

            <ul>
              <span className={style.navGroup}>PREFERENCES</span>
              <li>
                <NavLink
                  to="/settings"
                  className={({ isActive }) => (isActive ? style.active : "")}
                >
                  <SettingsIcon />
                  <div>設定</div>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/help"
                  className={({ isActive }) => (isActive ? style.active : "")}
                >
                  <HelpIcon />
                  <div>ヘルプ</div>
                </NavLink>
              </li>
            </ul>

            <ul className={style.NavbarBottom}>
              <li>
                <NavLink
                  to="/logout"
                  className={({ isActive }) => (isActive ? style.active : "")}
                >
                  <LogOutIcon />
                  <div>ログアウト</div>
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>
        {isMenuOpen && !smallScreen && <div className={style.overlay} onClick={(e) => {e.preventDefault(); setIsMenuOpen(false)}} />}
        <main className={style.right} id={style.main}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
