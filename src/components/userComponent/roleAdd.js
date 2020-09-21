import React, { Component } from "react";
import Header from "../homeComponent/Header";
import Menu from "../homeComponent/Menu";
import jwt_decode from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Link } from "react-router-dom";
class roleAdd extends Component {
  constructor() {
    super();
    this.state = {
      roleName: "",
      roleDescription: "",
      locations: [],
      isCheckedRoleAdd: true,
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
    let roleName = this.state.roleName;
    let roleDescription = this.state.roleDescription;
    let formIsValid = true;

    //Boş alan kontrol
    if (!roleName || !roleDescription) {
      formIsValid = false;
      toast.error("Boş alan bırakmayınız !!");
    }

    return formIsValid;
  }
  //submit
  onSubmit(e) {
    e.preventDefault();
    if (this.handleValidation()) {
      const newRoles = {
        roleName: this.state.roleName,
        roleDescription: this.state.roleDescription,
      };

      axios.post("roles/roleedit", newRoles).then((response) => {
        if (response.request.response == "true") {
          toast.success("Kayıt Başarılı! ");
            setTimeout(
            function () {
              window.location.replace("/roleadd");
            }.bind(this),
            1500
          );
        } else if (response.request.response == "false") {
          toast.error("Hata!Kayıt Başarısız! ");
        } else if (response.request.response == "err") {
          toast.error("Hata! Rol Sisteme Kayıtlı! ");
        }
      });
    }
  }
  //deleteRole
  deleteRole(data){
   
    confirmAlert({
        title: "Rol Sil",
        message: "Rolü silmek istediğinize emin misiniz?",
        buttons: [
          {
            label: "Evet",
            onClick: () =>
            axios.post("roles/roledelete", {_id:data._id}).then((response) => {
                //Kullanıcılar içi rol düzenlemesi yapılacak    
                       toast.success("Silme işlemi başarılı! ");
                       setTimeout(
                        function () {
                          window.location.replace("/roleadd");
                        }.bind(this),
                        1500
                      );
                   }),
          },
          {
            label: "Hayır",
            onClick: () => this.props.history.push("/roleedit"),
          },
        ],
      });

  }
  componentDidMount(e) {
    const token = localStorage.usertoken;
    try {
      jwt_decode(token);
      const decoded = jwt_decode(token);
      axios.get("roles/rolelist").then((res) => {
        var response = res.data;
        this.setState({
          locations: response,
        });
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
                    isCheckedRoleAdd: resRole.data[i].isCheckedRoleAdd,
                  });
                  if (this.state.isCheckedRoleAdd == false) {
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
      });
    } catch (error) {
      window.location.replace("/");
    }
  }
  render() {
    const rolesLocations = this.state.locations.map((data) => (
      <tr key={data._id}>
        <td></td>
        <td><Link to={{ pathname : "/roleedit" , state :{ roleUpdate : data} }}  className="nav-link">{data.roleName}</Link></td>
        <td></td>
        <td>{data.roleDescription}</td>
        <td>
          <button className="btn btn-danger btn-sm" onClick={()=>this.deleteRole(data)}>
            <span className="fa fa-trash"></span> Sil
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <Header />
        <Menu />

        <div className="content-wrapper">{this.state.isCheckedRoleAdd ? (
          <div className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-10">
                  <section className="content">
                    <div className="container-fluid">
                      <section class="content-header"></section>

                      <div className="card card-info">
                        <div className="card-header">
                          <h3 className="card-title">Rol Düzenle</h3>
                        </div>

                       
                          <div className="card-body">
                            <div className="form-group row">
                              <label className="col-sm-1 col-form-label">
                                Rol Adı
                              </label>
                              <div className="col-sm-4">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Rol Adı"
                                  name="roleName"
                                  value={this.state.roleName}
                                  onChange={this.onChange}
                                />
                              </div>

                              <label className="col-sm-1 col-form-label">
                                Açıklama
                              </label>
                              <div className="col-sm-4">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Rol Açıklaması"
                                  name="roleDescription"
                                  value={this.state.roleDescription}
                                  onChange={this.onChange}
                                />
                              </div>
                              <div className="col-sm-1">
                                <button
                                  type="submit"
                                  className="btn btn-info"
                                  onClick={this.onSubmit}
                                >
                                  Kaydet
                                </button>
                              </div>
                            </div>
                            <div>
                              <div className="row">
                                <div className="col-12">
                                  <div className="card">
                                    <div className="card-body table-responsive p-0">
                                      <table className="table table-condensed">
                                        <thead>
                                          <tr>
                                            <th></th>
                                            <th>Rol Adı</th>
                                            <th></th>
                                            <th>Rol Açıklaması</th>

                                            <th>Ayarlar</th>
                                          </tr>
                                        </thead>
                                        <tbody>{rolesLocations}</tbody>
                                      </table>
                                    </div>
                                    {/* /.card-body */}
                                  </div>
                                  {/* /.card */}
                                </div>
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
        ):null}
                {this.state.showStatus ? this.props.history.push("/statuserror") : null}

        </div>
        <ToastContainer />
      </div>
    );
  }
}
export default roleAdd;
