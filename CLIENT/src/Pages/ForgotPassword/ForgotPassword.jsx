import  { useState } from "react";
import { axiosInstance } from "../../utility/axios";
import classes from "./ForgotPassword.module.css";
import Layout from "../../Layout/Layout.jsx";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/user/forgotPassword", {
        email,
      });
      if (response.status === 200) {
        setMessage("Password reset link has been sent to your email.");
        setError(null);
      } else {
        setError(response.data.msg || "Failed to send password reset link.");
        setMessage(null);
      }
    } catch (err) {
      setError(
        err.response?.data?.msg || "Error sending reset link. Please try again."
      );
      setMessage(null);
    }
  };

  return (
    <Layout>
    <div className={classes.formcontainer}>
      <div className={classes.innerContainer}>
        <h2>Forgot your password?</h2>
        <p>
          Enter your email address, and we&apos;ll send you a link to reset your
          password.
        </p>
        {message && <p className={classes.success}>{message}</p>}
        {error && <p className={classes.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={email}
            onChange={handleChange}
            required
          />
          <button type="submit" className={classes.submitbtn}>
            Send reset link
          </button>
        </form>
      </div>
    </div>
    </Layout>
  );
}

export default ForgotPassword;
