import React, { Component } from "react";
import Header from "../homeComponent/Header";
import Menu from "../homeComponent/Menu";
import jwt_decode from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

class userUpdate extends Component {
  constructor(props) {
    super(props);
    if(this.props.location.state != undefined ){
        const {usersUpdate} = this.props.location.state;
        this.state ={
            userName: usersUpdate.userName,
            userFullName:usersUpdate.userFullName,
            userPassword:"",
            userEmail: usersUpdate.userEmail,
            userReplayPassword: "",
            userPhoneNo: usersUpdate.userPhoneNo,
            _id:usersUpdate._id,
            roleName:usersUpdate.roleName,
            isCheckedUserEdit: true,
            locationsrole:[]

        }
    }
    else{
        this.state={
            userName: "",
            userFullName: "",
            userPassword: "",
            userEmail: "",
            userReplayPassword: "",
            userPhoneNo: "",
            roleName:"",
            isCheckedUserEdit: true,
            locationsrole:[]


        }
    }
    this.onChangeUser = this.onChangeUser.bind(this);

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  } //Change
  onChangeUser(e) {
    this.setState({ [e.target.name]: e.target.value.trim() });
  }
    //Change
    onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
    //Validation
    handleValidation() {
      let userEmail = this.state.userEmail;
      let userPassword = this.state.userPassword;
      let userReplayPassword = this.state.userReplayPassword;
      let userPhoneNo = this.state.userPhoneNo;
      let userName = this.state.userName;
      let userFullName = this.state.userFullName;
      let formIsValid = true;
      let partternphone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
      let resultPhone= partternphone.test(userPhoneNo);
      let patternemail = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,10}[\.][a-z]{2,5}/g;
      let resultemail = patternemail.test(userEmail);
      //Boş alan kontrol
      if (
        !userEmail ||
        
        !userPhoneNo ||
        !userName ||
        !userFullName
      ) {
        formIsValid = false;
        toast.error("Boş alan bırakmayınız !!");
      } else if (userPassword != userReplayPassword) {
        formIsValid = false;
        toast.error("Şifre ve Tekrarı Uyuşmuyor !!");
      }
      else if(resultPhone ==false){
        formIsValid = false;
        toast.error("Hata!Lütfen Geçerli Telefon Numarası Giriniz!")
      }
      else if(resultemail ==false){
        formIsValid = false;
        toast.error("Hata!Lütfen Geçerli Email Adresi Giriniz!")
      }
  
      return formIsValid;
    }

//didmount
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
            this.setState({
              locationsrole:resRole.data
            })
              for (var i = 0; i < resRole.data.length; i++) {
               
                //UserModel == rolesModel 
                if(tokenRoleName==resRole.data[i].roleName)
                {
                  this.setState({
                    isCheckedUserEdit: resRole.data[i].isCheckedUserEdit,
                  
                  });               

                  if (this.state.isCheckedUserEdit == false) {
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
handleChangeRole = (e) => {
  let index = e.nativeEvent.target.selectedIndex;

  this.setState({
    roleName: e.nativeEvent.target[index].text,
  });
};
//submit
  onSubmit(e) {
    e.preventDefault();
    if (this.handleValidation()) {
      const updateUsers = {
        userEmail: this.state.userEmail,
        userPassword: this.state.userPassword,
        userPhoneNo: this.state.userPhoneNo,
        userName: this.state.userName,
        userFullName: this.state.userFullName,
        _id:this.state._id,
        roleName:this.state.roleName
      };
console.log(this.state.roleName)
      axios.put("users/userupdate", updateUsers).then((response) => {
      
          toast.success("Güncelleme Başarılı! ");
         setTimeout(
            function () {
              this.props.history.push("/userslist");
            }.bind(this),
            2000
          );
       
      })
      .catch((err)=>{
          toast.error("Hata!Güncelleme Başarısız!")
      })
    }
  }
 
  render() {
    const roleNames = this.state.locationsrole.map((data) => (
      <option key={data}>{data.roleName}</option>
    ));
    return (
        <div>
        <Header />
        <Menu />
        <div className="content-wrapper"> {this.state.isCheckedUserEdit ? (
          <div className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-12">
                  <section className="content">
                    <div className="container-fluid">
                      <section class="content-header"></section>

                      <div className="row">
                        <div className="col-md-6">
                          <div className="card card-info">
                            <div className="card-header">
                              <h3 className="card-title">Kullanıcı Güncelle</h3>
                            </div>
                            <div className="card-body">
                              <div className="form-group">
                                <label>Kullanıcı Adı : </label>
                                <div className="input-group">
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="userName"
                                    placeholder="Kullanıcı Adını Giriniz:"
                                    value={this.state.userName}
                                    onChange={this.onChangeUser}
                                  />
                                  <div className="input-group-prepend">
                                    <span className="input-group-text">
                                      <i className="far fa-user" />
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="form-group">
                                <label>Ad Soyad : </label>
                                <div className="input-group">
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="userFullName"
                                    placeholder="Adınız ve Soyadınızı Giriniz:"
                                    value={this.state.userFullName}
                                    onChange={this.onChange}
                                  />
                                  <div className="input-group-prepend">
                                    <span className="input-group-text">
                                      <i className="far fa-user" />
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="form-group">
                                <label>Email : </label>
                                <div className="input-group">
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="userEmail"
                                    placeholder="Email Adresinizi Giriniz:"
                                    value={this.state.userEmail}
                                    onChange={this.onChange}
                                  />
                                  <div className="input-group-prepend">
                                    <span className="input-group-text">
                                      <i className="far fa-envelope" />
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="form-group">
                                <label>Telefon No : </label>
                                <div className="input-group">
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="userPhoneNo"
                                    placeholder="Telefon Numarası Giriniz:"
                                    value={this.state.userPhoneNo}
                                    onChange={this.onChange}
                                  />
                                  <div className="input-group-prepend">
                                    <span className="input-group-text">
                                      <i className="fa fa-phone" />
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="form-group">
                                <label>Şifre Giriniz : </label>
                                <div className="input-group">
                                  <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Şifre Giriniz:"
                                    name="userPassword"
                                    value={this.state.userPassword}
                                    onChange={this.onChange}
                                  />
                                  <div className="input-group-prepend">
                                    <span className="input-group-text">
                                      <i className="fa fa-key" />
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="form-group">
                                <label>Şifre Tekrar : </label>
                                <div className="input-group">
                                  <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Şifre Tekrar:"
                                    name="userReplayPassword"
                                    value={this.state.userReplayPassword}
                                    onChange={this.onChange}
                                  />
                                   
                                  <div className="input-group-prepend">
                                    <span className="input-group-text">
                                      <i className="fa fa-key" />
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="form-group">
                                <label>Rol Seçiniz : </label>
                                <div className="input-group">
                                  
                                    <select
                                    className="form-control"
                                    onChange={this.handleChangeRole}
                                  >
                                    <option>{this.state.roleName} </option>
                                    {roleNames}
                                  </select>
                                  <div className="input-group-prepend">
                                    <span className="input-group-text">
                                      <i className="fab fa-black-tie" />
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
          </div> ) : null}
          {this.state.showStatus ? this.props.history.push("/statuserror") : null}
        </div>
        <ToastContainer />
      </div>
    );
  }
}
export default userUpdate;
