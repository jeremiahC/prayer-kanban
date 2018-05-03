import React from 'react';
import ReactDOM from 'react-dom';

class Navbar extends React.Component {
  render() {
    return (
      <div className="navbar">
        <div className="navbar-brand">Prayer Kanban</div>
        <div></div>
        <div className="navbar-menu">
          <ul className="navbar-links">
            <li className="item notification"><i className="fas fa-bell"></i></li>
            <li className="item user"><img className="profile-img" alt="User Profile"/></li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Navbar;