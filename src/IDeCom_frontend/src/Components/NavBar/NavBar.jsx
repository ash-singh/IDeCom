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
        localStorage.removeItem('username');;
        navigate("/");
    }

  return (
    <header>
      <div className="nav_container">
        <Link to="/" >
          <div className="nav_logo">
            IDeCom
          </div>
        </Link>

        <div className="nav_items">
          <Link to="/">
            <div>Home </div>
          </Link>
        </div>

        { authenticated && (
            <div className="nav_items">
            <Link to="/seller">
                <div>Seller </div>
            </Link>
          </div>
        )}

        <div className="nav_btn">
            <Link to="/cart" >
                <div >
                <i className="uil uil-shopping-bag"></i>Cart ({state.length})
                </div>
            </Link>
          { !authenticated && (
            <Link to="/login">
              <div >
                <i className="uil uil-user"></i>Login
              </div>
            </Link>
          )}

          { authenticated && (
            <>
                <div className="nav_items">
                    <div onClick={handleLogout}>
                        <i className="uil uil-user"></i>Logout
                    </div>
                </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
export default NavBar