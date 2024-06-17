import React from "react";
import { useState } from "react";

import { Outlet, Link } from "react-router-dom";

import { ReactComponent as HomeIcon } from "../../assets/icons/home.svg";
import { ReactComponent as StudentIcon } from "../../assets/icons/student.svg";
import { ReactComponent as UserPlusIcon } from "../../assets/icons/userPlus.svg";
import { ReactComponent as SettingsIcon } from "../../assets/icons/settings.svg";
import { ReactComponent as HelpIcon } from "../../assets/icons/home.svg";
// import BookmarkIcon from './assets/icons/bookmark.svg';

import style from "./layout.module.css";

const Layout = () => {
  const [activeLink, setActiveLink] = useState("/");

  const handleClick = (link) => {
    console.log(link)
    setActiveLink(link);
  };

  
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
                <Link to="/" onClick={ ()=> handleClick("/")} className={activeLink === "/" ? style.active : ""}>
                  <HomeIcon />
                  <div>Home</div>
                </Link>
              </li>
              <li>
                <Link onClick={ ()=> handleClick("/student")} to="/student" className={activeLink === "/student" ? style.active : ""}>
                  <StudentIcon />
                  <div>学生検索</div>
                </Link>
              </li>
              <li>
                <Link to="/student">
                  <UserPlusIcon />
                  <div>職員</div>
                </Link>
              </li>
              <li>
                <Link to="/student">
                  <UserPlusIcon />
                  <div>リクレーター</div>
                </Link>
              </li>
            </ul>

            <ul>
              <span className={style.navGroup}>PREFERENCES</span>
              <li>
                <Link to="/">
                  <SettingsIcon />
                  <div>設定</div>
                </Link>
              </li>
              <li>
                <Link to="/student">
                  <HelpIcon />
                  <div>ヘルプ</div>
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        <main className={style.right}>
          <Outlet />{" "}
          {/* This is where the routed components will be rendered */}
        </main>
      </div>
    </div>
  );
};

export default Layout;
