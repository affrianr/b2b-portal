import bLogo from "../assets/logo.jpg";
import sidePic from "../assets/Picture1.png";
import { Link, useNavigate } from "react-router-dom";
import { Response } from "./Login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register(): JSX.Element {
  const navigate = useNavigate();
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const dataUser = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      phone: formData.get("phone"),
    };
    try {
      const response = await fetch("http://127.0.0.1:8000/api/users/register", {
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
      return navigate("/login");
    } catch (error: any) {
      toast.warn(`${error.message[0]}`, {
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
            <span className="title">Create account</span>
            <form onSubmit={handleSubmit}>
              <label htmlFor="">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Full name"
              />
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
                type="text"
                name="password"
                placeholder="Password"
              />
              <label htmlFor="">Mobile Number</label>
              <input
                type="text"
                name="phone"
                id="phone"
                placeholder="Mobile Number"
              />

              <button type="submit">Register</button>
            </form>
            <div className="create-account">
              <p>
                Already have an account?{" "}
                <span>
                  <Link id="get-started" to="/login">
                    Login
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
