import bLogo from "../assets/logo.jpg";
import sidePic from "../assets/Picture1.png";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export interface Response {
  success: boolean;
  code: number;
  message: string;
  data: Data;
}

export interface Data {
  user: User;
  token: string;
  token_expires_in: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  created_at: Date;
  updated_at: Date;
}

export default function Login() {
  const navigate = useNavigate();
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const dataUser = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    try {
      const response = await fetch("http://127.0.0.1:8000/api/users/login", {
        method: "POST",
        body: JSON.stringify(dataUser),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data: Response = await response.json();
      if (!response.ok) {
        throw { message: data.message };
      }
      localStorage.setItem("access_token", data.data.token);

      return navigate("/");
    } catch (error: any) {
      toast.warn(`${error.message}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
      <div className="container-form">
        <div className="container-login">
          <div className="left">
            <div className="company">
              <img className="logo" src={bLogo} alt="" />
              <span>B2B Portal</span>
            </div>
            <span className="title">Login to your account</span>
            <form onSubmit={handleSubmit}>
              <label htmlFor="">Email Account</label>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="Email account"
              />
              <label htmlFor="">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Password"
              />
              <div className="remember-forgot">
                <div className="remember-me">
                  <input type="checkbox" />
                  <span> Remember me</span>
                </div>
                <Link to="/" className="forgot-password">
                  Forgot Password
                </Link>
              </div>
              <button type="submit">Login</button>
            </form>
            <div className="create-account">
              <p>
                Don't have an account?{" "}
                <span>
                  <Link id="get-started" to="/register">
                    Get started
                  </Link>
                </span>
              </p>
            </div>
          </div>
          <div className="right">
            <img src={sidePic} alt="" />
          </div>
        </div>
      </div>
    </>
  );
}
