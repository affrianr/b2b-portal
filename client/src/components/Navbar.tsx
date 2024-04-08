import { useNavigate } from "react-router-dom";
import avaIU from "../assets/iu.jpg";

import { useEffect, useState } from "react";

interface UserResponse {
  success: boolean;
  code: number;
  message: string;
  data: Data;
}

interface Data {
  user: User;
}

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  created_at: Date;
  updated_at: Date;
}

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>();
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    return navigate("/login");
  };

  async function fetchUser() {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch("http://127.0.0.1:8000/api/users/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data: UserResponse = await response.json();
      setUser(data?.data?.user);
    } catch (error) {}
  }

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <nav>
      <div className="search">
        <div className="box">
          <i
            className="bx bx-search icon"
            style={{ fontSize: 25, color: "black" }}
          ></i>
          <input
            type="text"
            name="search"
            placeholder="search stock and more"
          />
        </div>
      </div>
      <div className="menu">
        <div className="user">
          <span className="name">{user?.name}</span>
          <span className="email">{user?.email}</span>
        </div>
        <div className="left">
          <img src={avaIU} alt="avatar" />
          <i className="bx bx-bell"></i>
          <i
            className="bx bx-log-out-circle"
            aria-label="logout"
            onClick={handleLogout}
          ></i>
        </div>
      </div>
    </nav>
  );
}
