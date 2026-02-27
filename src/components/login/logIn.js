import React from "react";
import img from "./assets/image.avif";

const LogIn = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12 col-md-8 col-lg-6" style={{marginTop:"150px", height:"300px"}}>
          <img src={img} alt="E-Cafe" />
        </div>
        <div className="col-sm-12 col-md-8 col-lg-6 Auth-form-container">
          <form className="Auth-form">
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Log In</h3>
              <div className="form-group mt-3">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control mt-1"
                  placeholder="Enter email"
                />
              </div>
              <div className="form-group mt-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control mt-1"
                  placeholder="Enter password"
                />
              </div>
              <div className="d-grid gap-2 mt-3">
                <button type="submit" className="btn btn-danger">
                  Submit
                </button>
              </div>
              <p className="forgot-password text-right mt-2">
                Forgot <button type="button" className="btn btn-link p-0 align-baseline">password?</button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default LogIn;
