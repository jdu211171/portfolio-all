import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/student">Student</Link></li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet /> {/* This is where the routed components will be rendered */}
      </main>
      <footer>
        <p>© 2023 My Website</p>
      </footer>
    </div>
  );
};

export default Layout;
