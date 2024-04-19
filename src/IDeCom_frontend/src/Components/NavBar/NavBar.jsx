import "./NavBar.scss"
import React from "react"
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";

let NavBar = () => {
    const state = useSelector(state => state.handleCart);
    const authenticated = Boolean(localStorage.getItem('username'));
    const navigate = useNavigate();

    const handleLogout =() => {
        console.log("logout");
        localStorage.removeItem('username');;
        navigate("/");
    }

  return (
    <header>
      <div className="nav_container">
        <Link to="/" >
          <div className="nav_logo">
            IDecom
          </div>
        </Link>

        <div className="nav_items">
          <Link to="/">
            <div>Home </div>
          </Link>
        </div>


        <div className="nav_btn">
          { !authenticated && (
            <Link to="/login">
              <div >
                <i className="uil uil-user"></i>Login
              </div>
            </Link>
          )}

          { authenticated && (
            <>
                <button type="button" className="uil uil-user" onClick={handleLogout}>Logout!</button>

                <div className="nav_items">
                <Link to="/seller">
                    <div>Seller </div>
                </Link>
                </div>
            </>
          )}

          <Link to="/cart" >
            <div >
              <i className="uil uil-shopping-bag"></i>Cart ({state.length})
            </div>
          </Link>
        </div>

      </div>
    </header>
  )
}
export default NavBar