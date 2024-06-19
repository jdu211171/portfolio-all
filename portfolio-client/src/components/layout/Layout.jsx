import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { ReactComponent as HomeIcon } from "../../assets/icons/home.svg";
import { ReactComponent as StudentIcon } from "../../assets/icons/student.svg";
import { ReactComponent as UserPlusIcon } from "../../assets/icons/userPlus.svg";
import { ReactComponent as SettingsIcon } from "../../assets/icons/settings.svg";
import { ReactComponent as HelpIcon } from "../../assets/icons/help.svg";
import style from "./layout.module.css";

const Layout = () => {
  return (
    <div>
      <div className={style.topBar}>
        <div className={style.left}>
          <div className={style.logo}>
            <div>Logo</div>
            <div>JDU Portfolio</div>
          </div>
        </div>
        <div className={style.right}>2</div>
      </div>
      <div className={style.sideBar}>
        <header className={style.left}>
          <nav>
            <ul>
              <span className={style.navGroup}>GENERAL</span>
              <li>
                <NavLink 
                  to="/" 
                  className={({ isActive }) => isActive ? style.active : ""}
                >
                  <HomeIcon />
                  <div>Home</div>
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/student" 
                  className={({ isActive }) => isActive ? style.active : ""}
                >
                  <StudentIcon />
                  <div>学生検索</div>
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/staff" 
                  className={({ isActive }) => isActive ? style.active : ""}
                >
                  <UserPlusIcon />
                  <div>職員</div>
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/recruiter" 
                  className={({ isActive }) => isActive ? style.active : ""}
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
                  className={({ isActive }) => isActive ? style.active : ""}
                >
                  <SettingsIcon />
                  <div>設定</div>
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/help" 
                  className={({ isActive }) => isActive ? style.active : ""}
                >
                  <HelpIcon />
                  <div>ヘルプ</div>
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>
        <main className={style.right}>
          <Outlet /> {/* This is where the routed components will be rendered */}
        </main>
      </div>
    </div>
  );
};

export default Layout;
