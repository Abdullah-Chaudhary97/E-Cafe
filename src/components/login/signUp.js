import React from "react";
import img from "./assets/blogimage.png";
import { Formik, Field, Form } from "formik";

const UsersignUp = () => {
  return (
    <div className="container">
      <div className="row" style={{marginTop:"150px"}}>
        <div className="col-md-8 col-sm-12" >
          <img src={img} alt="Sign up" style={{marginTop:"80px" ,marginLeft:"80px",width:"500px" , height:"400px"}}/>
        </div>
        <div className="col-md-4 col-sm-12 Auth-form">
          <h2 className="Auth-form-title">SignUp</h2>
          <Formik
            initialValues={{ name: "", email: "", password: "", phone: "" }}
            onSubmit={(values,{resetForm}) => {
              console.log(values);
              resetForm({values:""})
            }}
          >
            {() => (
              <Form>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <Field name="name" className="form-control mt-1" type="text" />
                </div>

                <div className="form-group mt-3">
                  <label htmlFor="email">Email</label>
                  <Field name="email" className="form-control mt-1" type="email" />
                </div>

                <div className="form-group mt-3">
                  <label htmlFor="subject">password</label>
                  <Field
                    name="password"
                    className="form-control mt-1"
                    type="password"
                  />
                </div>

                <div className="form-group mt-3">
                  <label htmlFor="content">phone</label>
                  <Field name="phone" className="form-control mt-1" type="text" />
                </div>
                <div className="d-grid gap-2 mt-3">
                  <button type="submit" className="btn btn-danger">
                    SignUp
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default UsersignUp;
