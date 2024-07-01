import React, { useState } from "react";
import MainLogo from "../assets/images/logo";
import { useAuth } from "../modules/auth/auth-context";
import "../assets/styles/navbar.scss";
import Basket from "../assets/images/basket";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <nav className="nav">
        <div className="nav-logo" onClick={() => navigate("/")}>
          <MainLogo />
        </div>
        <div className="nav-elements">
          <ul className="nav-links">
            <li onClick={() => navigate("/products")}>Магазин</li>
            {user ? (
              <div className="user-infos">
                <img
                  src={`https://limitless-peak-31978-868db4faa179.herokuapp.com/${user.avatar}`}
                  alt={user.firstname}
                />
                <li>{user.firstname}</li>
              </div>
            ) : (
              <>
                <li onClick={() => navigate("/auth/login")}>Логин</li>
                <li onClick={() => navigate("/auth/register")}>Регистрация</li>
              </>
            )}
          </ul>
          <p className="line-nav">|</p>
          <div className="nav-auth">
            <Basket />
            <div className="burger" onClick={toggleModal}>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
            </div>
          </div>
        </div>
      </nav>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-button" onClick={toggleModal}>
              &times;
            </button>
            <ul className="modal-links">
              <li onClick={() => navigate("/products")}>Магазин</li>
              {user ? (
                <div className="user-infos">
                  <img
                    src={`https://limitless-peak-31978-868db4faa179.herokuapp.com/${user.avatar}`}
                    alt={user.firstname}
                  />
                  <li>{user.firstname}</li>
                </div>
              ) : (
                <>
                  <li onClick={() => navigate("/auth/login")}>Логин</li>
                  <li onClick={() => navigate("/auth/register")}>
                    Регистрация
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
