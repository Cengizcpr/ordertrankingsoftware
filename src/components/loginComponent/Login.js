import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      userEmail:"",
      userPassword:""
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  //Change 
  onChange(e) {
    this.setState ({ [e.target.name]: e.target.value})
  }
  //Validation controller
  handleValidation(){

    let userEmail = this.state.userEmail;
    let userPassword = this.state.userPassword;
    let formIsValid = true;
    

    //Boş alan kontrol
    if(!userEmail || !userPassword){
      formIsValid = false;
      toast.error ("Boş alan bırakmayınız !!");
    }

    return formIsValid;

  }

  //Submit 
  onSubmit(e){
    e.preventDefault();
   if(this.handleValidation()){

      const users = {
        userEmail : this.state.userEmail,
        userPassword : this.state.userPassword
      };

      axios
      .post("users/login",{
        userEmail : users.userEmail,
        userPassword : users.userPassword
      })
      .then((res)=>{
        //Hata kontrolü
        console.log(users.userEmail+ " "+ users.userPassword)
        localStorage.setItem("usertoken",res.data);
        if (res.data == "[object Object]") {
          this.setState({
            userEmail: "",
            userPassword: ""
          });
          toast.error("Hata!Email Adresi Veya Şifre Yanlış!");
        }
        else {
          //token değeri varsa üretilen toker değerinin statusune gore sayfalara yönlendirme
          const token = localStorage.usertoken;
          jwt_decode(token);
          const decoded = jwt_decode(token);
          toast.success("Giriş Başarılı!")
          setTimeout(
            function () {
              window.location.replace("/home");
            }.bind(this),
            1000
          );        }
      })


    }
  }

  render() {
    return (
      <div className="hold-transition login-page">
        <div className="login-box">
          <div className="login-logo">
            <Link to="/">
              <b>SiparişTakip</b>Giriş
            </Link>
          </div>
          <div className="card">
            <div className="card-body login-card-body">
              <form onSubmit={this.onSubmit}>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="userEmail"
                    placeholder="Email Adresi"
                    value={this.state.userEmail}
                    onChange={this.onChange}

                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-envelope" />
                    </div>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <input
                    type="password"
                    className="form-control"
                    name="userPassword"
                    placeholder="Şifre"
                    value={this.state.userPassword}
                    onChange={this.onChange}

                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-lock" />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-4">
                    <button
                      type="submit"
                      className="btn btn-primary btn-block btn-flat"
                    >
                      Giriş
                    </button>
                  </div>
                </div>
              </form>
              <ToastContainer />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;
