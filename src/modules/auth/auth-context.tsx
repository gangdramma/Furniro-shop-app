import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { IEntity } from "./types";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

interface AuthContextType {
  user: IEntity.IUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoggedIn: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<IEntity.IUser | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStoredUser = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Error fetching user from localStorage:", error);
      }
    };

    fetchStoredUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post<IEntity.IData>(
        "https://limitless-peak-31978-868db4faa179.herokuapp.com/api/v1/auth/login",
        { email, password }
      );
      const userData = response.data;
      setUser(userData.user);
      localStorage.setItem("user", JSON.stringify(userData.user));
      navigate("/");
    } catch (error: any) {
      console.error("Error occurred during login:", error.message);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast.success("Успешно вышел из системы");
    navigate("/");
  };

  const isLoggedIn = () => {
    return !!user;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
