import { useState } from "react";
import {axiosInstance} from "../../utility/axios.js";
import classes from "./login.module.css";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
function Login({ onSwitch }) {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post(
        "/users/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );
      // console.log(response.data)
      localStorage.setItem("EV-Forum-token-Jun2024", response.data.token); // Store the token in local storage Jun
      window.location.href = "/"; // This will navigate to the / page and refresh the application
      if (response.status === 200) {
        setSuccess("Login successful! Redirecting..."); 
        await Swal.fire({
          title: "Success!",
          text: "User Loggedin successfully!",
          icon: "success",
          confirmButtonText: "OK"
        })
        setError(null);
      } else {
        setError(response.data.msg || "Login failed.");
        await Swal.fire({
          title: "Error",
          text: response.data.msg || "Error submitting the form. Please try again",
          icon: "error",
          confirmButtonText: "OK"
        });
        setSuccess(null);
      }
    } catch (err) {
      setError(
        err.response?.data?.msg || "Error logging in. Please try again."+err
      );
      await Swal.fire({
        title: "Error",
        text: err.response?.data?.msg || "Error submitting the form. Please try again",
        icon: "error",
        confirmButtonText: "OK"
      });
      setSuccess(null);
    }
  };

  return (
    <div className={classes.formcontainer}>
      <div className={classes.innerContainer}>
     <div className={classes.heading}>
     <h2 className={classes.title}>Login to your account</h2>
      <p className={classes.signuptext}>
        Don't have an account?{" "}
        <a
          onClick={onSwitch}
          style={{ cursor: "pointer", color: "var(--primary-color)" }}
        >
          Create a new account
        </a>
      </p>
      {error && (
        <p className={classes.error} style={{ marginBottom: "10px" }}>
          {error}
        </p>
      )}{" "}
      {/* Display error message */}
      {success && <p className={classes.success}>{success}</p>}
     </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          placeholder="User name or Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <div className={classes.passwordinput}>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="button" onClick={handleTogglePassword} style={{}}>
            {showPassword ? "🙉" : "🙈"}
          </button>
        </div>
        <p className={classes.forgotpasswordtext}>
          <Link to="/forgetPass">Forgot password?</Link>
        </p>
        <button type="submit" className={classes.submitbtn}>
          Submit
        </button>
          
          <p style={{ cursor: "pointer",margin: "0 auto", color: "var(--primary-color)" }}>
       
        
        <a
          onClick={onSwitch}
        >
          Create an account?
        </a>
      </p>
      </form>
      </div>
    </div>
  );
}

export default Login;
