import React, { Component } from "react";
import Header from "../homeComponent/Header";
import Menu from "../homeComponent/Menu";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class companyAdd extends Component {
  constructor() {
    super();
    this.state = {
      isCheckedCompanyAdd: true,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
//Change
onChange(e) {
  this.setState({ [e.target.name]: e.target.value });
}
//Validation
handleValidation() {
  let companyName = this.state.companyName;
  let companyStatusName = this.state.companyStatusName;
  let taxCircle = this.state.taxCircle;
  let taxNumber = this.state.taxNumber;
  let companyEmail = this.state.companyEmail;
  let companyPhoneNo = this.state.companyPhoneNo;
  let companyAdress = this.state.companyAdress;
  let formIsValid = true;
  let partterTaxNumber =/^[0-9\b]+$/

  let resultTaxNumber = partterTaxNumber.test(taxNumber);
  let partternphone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  let resultPhone= partternphone.test(companyPhoneNo);
  let patternemail = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,10}[\.][a-z]{2,5}/g;
  let resultemail = patternemail.test(companyEmail);
  //Boş alan kontrol
  if (
    !companyName ||
    !companyStatusName ||
    !taxCircle ||
    !taxNumber ||
    !companyEmail ||
    !companyPhoneNo || 
    !companyAdress
  ) {
    formIsValid = false;
    toast.error("Boş alan bırakmayınız !!");
  } //Veri numarası kontrol?
  else if (resultTaxNumber === false) {
    formIsValid = false;
    toast.warn("Vergi Numarası Giriniz!");
  }//Telefon Numarası kontrol ?
  else if (resultPhone === false) {
    formIsValid = false;
    toast.warn("Geçerli Telefon Numarası Giriniz!");
  }
  else if (resultemail === false) {
    formIsValid = false;
    toast.warn("Geçerli Email Adresi Giriniz!");
  }

  return formIsValid;
}
//submit
onSubmit(e){
  e.preventDefault();
  if(this.handleValidation())
  {
    const newCompany = {
      companyName: this.state.companyName,
      companyStatusName: this.state.companyStatusName,
      taxCircle: this.state.taxCircle,
      taxNumber: this.state.taxNumber,
      companyEmail: this.state.companyEmail,
      companyPhoneNo: this.state.companyPhoneNo,
      companyAdress: this.state.companyAdress
    };

    axios.post("company/companyregister", newCompany).then((response) => {
      if (response.request.response == "true") {
        toast.success("Firma Kayıt Başarılı! ");
       setTimeout(
          function () {
            this.props.history.push("/companylist");
          }.bind(this),
          2000
        );
      } else if (response.request.response == "false") {
        toast.error("Hata!Kayıt Başarısız! ");
      } else if (response.request.response == "err") {
        toast.error("Hata! Firma Adı Sisteme Kayıtlı! ");
      }
    });
  }

}

  //ComponentDidmount
  componentDidMount(e) {
    const token = localStorage.usertoken;
    try {
      jwt_decode(token);
      const decoded = jwt_decode(token);
      //User Get
      axios.get("users/userlist").then((resUser) => {
        for (var j = 0; j < resUser.data.length; j++) {
          //Sisteme girili id == Veri tabanı id
          if (decoded._id === resUser.data[j]._id) {
            var tokenRoleName= resUser.data[j].roleName
            //Role Get
           axios.get("roles/rolelist").then((resRole) => {
              for (var i = 0; i < resRole.data.length; i++) {
                
                //UserModel == rolesModel 
                if(tokenRoleName==resRole.data[i].roleName)
                {
                  this.setState({
                    isCheckedCompanyAdd: resRole.data[i].isCheckedCompanyAdd,
                  });
                  if (this.state.isCheckedCompanyAdd == false) {
                    this.setState({
                      showStatus: true,
                    });
                  }
                }
              }
            });
          }
        }
      });
    } catch (error) {
      window.location.replace("/");
    }
  }

  render() {
    return (
      <div>
        <Header />
        <Menu />{" "}
        {this.state.isCheckedCompanyAdd ? (
          <div className="content-wrapper">
                 <div className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-12">
                  <section className="content">
                    <div className="container-fluid">
                      <section class="content-header"></section>

                      <div className="row">
                        <div className="col-md-6">
                          <div className="card card-danger">
                            <div className="card-header">
                              <h3 className="card-title">Firma Oluştur</h3>
                            </div>
                            <div className="card-body">
                              <div className="form-group">
                                <label>Firma Adı : </label>
                                <div className="input-group">
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="companyName"
                                    placeholder="Firma Adını Giriniz:"
                                    value={this.state.companyName}
                                    onChange={this.onChange}
                                  />
                                  <div className="input-group-prepend">
                                    <span className="input-group-text">
                                      <i className="far fa-building" />
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="form-group">
                                <label>Firma Yetkilisi : </label>
                                <div className="input-group">
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="companyStatusName"
                                    placeholder="Firma Yetkilisini Giriniz:"
                                    value={this.state.companyStatusName}
                                    onChange={this.onChange}
                                  />
                                  <div className="input-group-prepend">
                                    <span className="input-group-text">
                                      <i className="fas fa-user-tie" />
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="form-group">
                                <label>Firma Vergi Dairesi : </label>
                                <div className="input-group">
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="taxCircle"
                                    placeholder="Firma Vergi Dairesi Giriniz:"
                                    value={this.state.taxCircle}
                                    onChange={this.onChange}
                                  />
                                  <div className="input-group-prepend">
                                    <span className="input-group-text">
                                      <i className="far fa-file-alt" />
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="form-group">
                                <label>Firma Vergi Numarası : </label>
                                <div className="input-group">
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="taxNumber"
                                    placeholder="Firma Vergi Numarası Giriniz:"
                                    value={this.state.taxNumber}
                                    onChange={this.onChange}
                                  />
                                  <div className="input-group-prepend">
                                    <span className="input-group-text">
                                      <i className="far fa-file-alt" />
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="form-group">
                                <label>Firma Email Adresi : </label>
                                <div className="input-group">
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="companyEmail"
                                    placeholder="Firma Email Adresini Giriniz:"
                                    value={this.state.companyEmail}
                                    onChange={this.onChange}
                                  />
                                  <div className="input-group-prepend">
                                    <span className="input-group-text">
                                      <i className="fa fa-envelope" />
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="form-group">
                                <label>Firma Telefon No : </label>
                                <div className="input-group">
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="companyPhoneNo"
                                    placeholder="Firma Telefon Numarası Giriniz:"
                                    value={this.state.companyPhoneNo}
                                    onChange={this.onChange}
                                    maxLength="11"
                                  />
                                  <div className="input-group-prepend">
                                    <span className="input-group-text">
                                      <i className="fa fa-phone" />
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="form-group">
                                <label>Firma Adresi : </label>
                                <div className="input-group">
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Firma Adresi Giriniz:"
                                    name="companyAdress"
                                    value={this.state.companyAdress}
                                    onChange={this.onChange}
                                  />
                                  <div className="input-group-prepend">
                                    <span className="input-group-text">
                                      <i className="fas fa-map-marker-alt" />
                                    </span>
                                  </div>
                                </div>
                              </div>
                              

                              <button
                                type="submit"
                                className="btn btn-info"
                                onClick={this.onSubmit}
                              >
                                Kaydet
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
          </div>
        ) : null}
        {this.state.showStatus ? this.props.history.push("/statuserror") : null}
        <ToastContainer />

      </div>
    );
  }
}
export default companyAdd;
