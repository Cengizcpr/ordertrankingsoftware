import React, { Component } from "react";
import Header from "../homeComponent/Header";
import Menu from "../homeComponent/Menu";
import jwt_decode from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

class roleEdit extends Component {
  constructor(props) {
    super(props);

    if (this.props.location.state != undefined) {
      const { roleUpdate } = this.props.location.state;
      this.state = {
        roleName: roleUpdate.roleName,
        _id: roleUpdate._id,
        isCheckedCheckAll: roleUpdate.isCheckedCheckAll,
        isCheckedUserAdd: roleUpdate.isCheckedUserAdd,
        isCheckedUserEdit: roleUpdate.isCheckedUserEdit,
        isCheckedUserList:  roleUpdate.isCheckedUserList,
        isCheckedCompanyAdd:  roleUpdate.isCheckedCompanyAdd,
        isCheckedCompanyEdit:  roleUpdate.isCheckedCompanyEdit,
        isCheckedCompanyList:  roleUpdate.isCheckedCompanyList,
        isCheckedProductAdd:  roleUpdate.isCheckedProductAdd,
        isCheckedProductEdit:  roleUpdate.isCheckedProductEdit,
        isCheckedProductList:  roleUpdate.isCheckedProductList,
        isCheckedOrderAdd:  roleUpdate.isCheckedOrderAdd,
        isCheckedOrderEdit:  roleUpdate.isCheckedOrderEdit,
        isCheckedOrderList:  roleUpdate.isCheckedOrderList,
        isCheckedRoleAdd:  roleUpdate.isCheckedRoleAdd,
        isCheckedRoleEdit:  roleUpdate.isCheckedRoleEdit,
     
        isCheckedRoleEditSet :true
      };
    } else {
      this.state = {
        roleName: "Rol Seçilmedi",
        isCheckedRoleEditSet:true
      };
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  //Validation
  handleValidation() {
    let roleName = this.state.roleName;
    let formIsValid = true;

    if (roleName == "Rol Seçilmedi") {
      toast.error("Hata!Rol Seçilmedi!");
      formIsValid=false;
    }
    return formIsValid;
  }
  //Submit
  onSubmit(e) {
    e.preventDefault();
    console.log("asd")
    if (this.handleValidation()) {
      const updateRoles = {
        _id: this.state._id,
        isCheckedCheckAll: this.state.isCheckedCheckAll,
        isCheckedUserAdd: this.state.isCheckedUserAdd,
        isCheckedUserEdit: this.state.isCheckedUserEdit,
        isCheckedUserList: this.state.isCheckedUserList,
        isCheckedCompanyAdd: this.state.isCheckedCompanyAdd,
        isCheckedCompanyEdit: this.state.isCheckedCompanyEdit,
        isCheckedCompanyList: this.state.isCheckedCompanyList,
        isCheckedProductAdd: this.state.isCheckedProductAdd,
        isCheckedProductEdit: this.state.isCheckedProductEdit,
        isCheckedProductList: this.state.isCheckedProductList,
        isCheckedOrderAdd: this.state.isCheckedOrderAdd,
        isCheckedOrderEdit: this.state.isCheckedOrderEdit,
        isCheckedOrderList: this.state.isCheckedOrderList,
        isCheckedRoleAdd: this.state.isCheckedRoleAdd,
        isCheckedRoleEdit: this.state.isCheckedRoleEdit,
        
      };
      console.log(updateRoles)
      axios
        .put("roles/roleupdate", updateRoles)
        .then((response) => {
          toast.success("Güncelleme Başarılı! ");
          setTimeout(
            function () {
              window.location.replace("/roleadd");
            }.bind(this),
            1500
          );
        })
        .catch((err) => {
          toast.success("Hata!Güncelleme Başarısız! ");
        });
    }
  }

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
                    isCheckedRoleEditSet: resRole.data[i].isCheckedRoleEdit,
                    locations: resRole.data
                  });
                  if (this.state.isCheckedRoleEditSet == false) {
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
  //Change
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  //UserAdd
  toggleChangeUserAdd = () => {
    this.setState({
      isCheckedUserAdd: !this.state.isCheckedUserAdd,
    });
  };
  //UserList
  toggleChangeUserList = () => {
    this.setState({
      isCheckedUserList: !this.state.isCheckedUserList,
    });
  };
  //UserEdit
  toggleChangeUserEdit = () => {
    this.setState({
      isCheckedUserEdit: !this.state.isCheckedUserEdit,
    });
  };
  //RoleAdd
  toggleChangeRoleAdd = () => {
    this.setState({
      isCheckedRoleAdd: !this.state.isCheckedRoleAdd,
    });
  };
  //RoleEdit
  toggleChangeRoleEdit = () => {
    this.setState({
      isCheckedRoleEdit: !this.state.isCheckedRoleEdit,
    });
  };
  //CompanyAdd
  toggleChangeCompanyAdd = () => {
    this.setState({
      isCheckedCompanyAdd: !this.state.isCheckedCompanyAdd,
    });
  };
  //CompanyList
  toggleChangeCompanyList = () => {
    this.setState({
      isCheckedCompanyList: !this.state.isCheckedCompanyList,
    });
  };
  //CompanyEdit
  toggleChangeCompanyEdit = () => {
    this.setState({
      isCheckedCompanyEdit: !this.state.isCheckedCompanyEdit,
    });
  };
  //ProductAdd
  toggleChangeProductAdd = () => {
    this.setState({
      isCheckedProductAdd: !this.state.isCheckedProductAdd,
    });
  };
  //ProductList
  toggleChangeProductList = () => {
    this.setState({
      isCheckedProductList: !this.state.isCheckedProductList,
    });
  };
  //ProductEdit
  toggleChangeProductEdit = () => {
    this.setState({
      isCheckedProductEdit: !this.state.isCheckedProductEdit,
    });
  };
  //OrderAdd
  toggleChangeOrderAdd = () => {
    this.setState({
      isCheckedOrderAdd: !this.state.isCheckedOrderAdd,
    });
  };
  //OrderEdit
  toggleChangeOrderEdit = () => {
    this.setState({
      isCheckedOrderEdit: !this.state.isCheckedOrderEdit,
    });
  };
  //OrderList
  toggleChangeOrderList = () => {
    this.setState({
      isCheckedOrderList: !this.state.isCheckedOrderList,
    });
  };

  //toggleChangeAll
  toggleChangeAll = () => {
    this.setState({
      isCheckedCheckAll: !this.state.isCheckedCheckAll,
     
      isCheckedUserAdd: !this.state.isCheckedUserAdd,
      isCheckedUserEdit: !this.state.isCheckedUserEdit,
      isCheckedUserList: !this.state.isCheckedUserList,
      isCheckedRoleAdd: !this.state.isCheckedRoleAdd,
      isCheckedRoleEdit: !this.state.isCheckedRoleEdit,
      isCheckedCompanyAdd: !this.state.isCheckedCompanyAdd,
      isCheckedCompanyList: !this.state.isCheckedCompanyList,
      isCheckedCompanyEdit: !this.state.isCheckedCompanyEdit,
      isCheckedProductAdd: !this.state.isCheckedProductAdd,
      isCheckedProductEdit: !this.state.isCheckedProductEdit,
      isCheckedProductList: !this.state.isCheckedProductList,
      isCheckedOrderAdd: !this.state.isCheckedOrderAdd,
      isCheckedOrderEdit: !this.state.isCheckedOrderEdit,
      isCheckedOrderList: !this.state.isCheckedOrderList,
    });
  };
  render() {
    return (
      <div>
        <Header />
        <Menu />
        <div className="content-wrapper">
        {this.state.isCheckedRoleEditSet ? (
          <div className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-8">
                  <section className="content">
                    <div className="container-fluid">
                      <section class="content-header"></section>

                      <div className="card card-info">
                        <div className="card-header">
                          <h3 className="card-title">
                            Tüm Yetkiler ({this.state.roleName})
                          </h3>
                        </div>

                        <div className="card-body">
                          <div>
                            <div className="row">
                              <div className="col-12">
                                <div className="card">
                                  <div className="card-body table-responsive p-0">
                                    <table className="table table-condensed">
                                      <thead>
                                        <tr>
                                          <th></th>
                                          <th>YETKİ ADI </th>
                                          <th></th>
                                          <th>AÇIKLAMA</th>

                                          <th>
                                            <input
                                              type="checkbox"
                                              checked={
                                                this.state.isCheckedCheckAll
                                              }
                                              onChange={this.toggleChangeAll}
                                            />
                                          </th>
                                        </tr>
                                        <tr>
                                          <th></th>
                                          <th colSpan="4">
                                            <span style={{ color: "#333333" }}>
                                              KULLANICILAR{" "}
                                            </span>
                                          </th>
                                        </tr>
                                        <tr>
                                          <td></td>
                                          <td>Kullanıcı Ekle</td>
                                          <td></td>
                                          <td>Yeni kullanıcı oluşturur. </td>

                                          <td>
                                            <input
                                              type="checkbox"
                                              checked={
                                                this.state.isCheckedUserAdd
                                              }
                                              onChange={
                                                this.toggleChangeUserAdd
                                              }
                                            />
                                          </td>
                                        </tr>
                                        <tr>
                                          <td></td>
                                          <td>Kullanıcı Listele</td>
                                          <td></td>
                                          <td>
                                            Kullanıcıların bilgilerinin
                                            listelendiği yerdir.
                                          </td>

                                          <td>
                                            <input
                                              type="checkbox"
                                              checked={
                                                this.state.isCheckedUserList
                                              }
                                              onChange={
                                                this.toggleChangeUserList
                                              }
                                            />
                                          </td>
                                        </tr>
                                        <tr>
                                          <td></td>
                                          <td>Kullanıcı Düzenle</td>
                                          <td></td>
                                          <td>
                                            Kullanıcılar hakkında güncellemeler
                                            gerçekleştirilir.
                                          </td>

                                          <td>
                                            <input
                                              type="checkbox"
                                              checked={
                                                this.state.isCheckedUserEdit
                                              }
                                              onChange={
                                                this.toggleChangeUserEdit
                                              }
                                            />
                                          </td>
                                        </tr>
                                        <tr>
                                          <th></th>
                                          <th colSpan="4">YETKİLER</th>
                                        </tr>
                                        <tr>
                                          <td></td>
                                          <td>Yetki Ekle</td>
                                          <td></td>
                                          <td>
                                            Rol tanımlama için kullanılır.
                                          </td>

                                          <td>
                                            <input
                                              type="checkbox"
                                              checked={
                                                this.state.isCheckedRoleAdd
                                              }
                                              onChange={
                                                this.toggleChangeRoleAdd
                                              }
                                            />
                                          </td>
                                        </tr>
                                        <tr>
                                          <td></td>
                                          <td>Yetki Düzenle</td>
                                          <td></td>
                                          <td>
                                            Erişim alanları hakkında düzenleme
                                            yapılır.
                                          </td>

                                          <td>
                                            <input
                                              type="checkbox"
                                              checked={
                                                this.state.isCheckedRoleEdit
                                              }
                                              onChange={
                                                this.toggleChangeRoleEdit
                                              }
                                            />
                                          </td>
                                        </tr>
                                        <tr>
                                          <th></th>
                                          <th colSpan="4">FİRMALAR</th>
                                        </tr>
                                        <tr>
                                          <td></td>
                                          <td>Firma Oluştur</td>
                                          <td></td>
                                          <td>
                                            Firma bilgileri kaydedildiği yerdir.
                                          </td>

                                          <td>
                                            <input
                                              type="checkbox"
                                              checked={
                                                this.state.isCheckedCompanyAdd
                                              }
                                              onChange={
                                                this.toggleChangeCompanyAdd
                                              }
                                            />
                                          </td>
                                        </tr>
                                        <tr>
                                          <td></td>
                                          <td>Firmaları Listele</td>
                                          <td></td>
                                          <td>
                                            Firmalar hakkında oluşturulan
                                            listedir.
                                          </td>

                                          <td>
                                            <input
                                              type="checkbox"
                                              checked={
                                                this.state.isCheckedCompanyList
                                              }
                                              onChange={
                                                this.toggleChangeCompanyList
                                              }
                                            />
                                          </td>
                                        </tr>
                                        <tr>
                                          <td></td>
                                          <td>Firmaları Düzenle</td>
                                          <td></td>
                                          <td>
                                            Firma bilgileri hakkında
                                            güncellemeler yapılır.
                                          </td>

                                          <td>
                                            <input
                                              type="checkbox"
                                              checked={
                                                this.state.isCheckedCompanyEdit
                                              }
                                              onChange={
                                                this.toggleChangeCompanyEdit
                                              }
                                            />
                                          </td>
                                        </tr>
                                        <tr>
                                          <th></th>
                                          <th colSpan="4">ÜRÜNLER</th>
                                        </tr>
                                        <tr>
                                          <td></td>
                                          <td>Ürün Oluştur</td>
                                          <td></td>
                                          <td>
                                            Yeni ürün kaydı için kullanılır.
                                          </td>

                                          <td>
                                            <input
                                              type="checkbox"
                                              checked={
                                                this.state.isCheckedProductAdd
                                              }
                                              onChange={
                                                this.toggleChangeProductAdd
                                              }
                                            />
                                          </td>
                                        </tr>{" "}
                                        <tr>
                                          <td></td>
                                          <td>Ürünleri Listele</td>
                                          <td></td>
                                          <td>Kayıtlı ürünlerin listesidir.</td>

                                          <td>
                                            <input
                                              type="checkbox"
                                              checked={
                                                this.state.isCheckedProductList
                                              }
                                              onChange={
                                                this.toggleChangeProductList
                                              }
                                            />
                                          </td>
                                        </tr>{" "}
                                        <tr>
                                          <td></td>
                                          <td>Ürünleri Düzenle</td>
                                          <td></td>
                                          <td>
                                            Ürünler hakkında güncellemeler
                                            gerçekleştirilir.
                                          </td>

                                          <td>
                                            <input
                                              type="checkbox"
                                              checked={
                                                this.state.isCheckedProductEdit
                                              }
                                              onChange={
                                                this.toggleChangeProductEdit
                                              }
                                            />
                                          </td>
                                        </tr>
                                        <tr>
                                          <th></th>
                                          <th colSpan="4">SİPARİŞLER</th>
                                        </tr>{" "}
                                        <tr>
                                          <td></td>
                                          <td>Sipariş Oluştur</td>
                                          <td></td>
                                          <td>
                                            Yeni sipariş oluşturmak için
                                            kullanılır.
                                          </td>

                                          <td>
                                            <input
                                              type="checkbox"
                                              checked={
                                                this.state.isCheckedOrderAdd
                                              }
                                              onChange={
                                                this.toggleChangeOrderAdd
                                              }
                                            />
                                          </td>
                                        </tr>{" "}
                                        <tr>
                                          <td></td>
                                          <td>Siparişleri Listele</td>
                                          <td></td>
                                          <td>
                                            Kayıtlı siparişlerin listesidir.
                                          </td>

                                          <td>
                                            <input
                                              type="checkbox"
                                              checked={
                                                this.state.isCheckedOrderList
                                              }
                                              onChange={
                                                this.toggleChangeOrderList
                                              }
                                            />
                                          </td>
                                        </tr>{" "}
                                        <tr>
                                          <td></td>
                                          <td>Siparişleri Düzenle</td>
                                          <td></td>
                                          <td>
                                            Kayıtlı siparişler hakkında
                                            güncellemeler yapılır.
                                          </td>

                                          <td>
                                            <input
                                              type="checkbox"
                                              checked={
                                                this.state.isCheckedOrderEdit
                                              }
                                              onChange={
                                                this.toggleChangeOrderEdit
                                              }
                                            />
                                          </td>
                                        </tr>
                                        
                                   
                                        <tr>
                                          <th></th>
                                          <th></th>
                                          <th></th>
                                          <th></th>

                                          <th>
                                            <div class="box-footer">
                                              <button
                                                type="submit"
                                                class="btn btn-success pull-right"
                                                onClick={this.onSubmit}
                                              >
                                                Kaydet
                                              </button>
                                            </div>
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody></tbody>
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
          </div> ):null}
          {this.state.showStatus ? this.props.history.push("/statuserror") : null}

        </div>
        <ToastContainer />
      </div>
    );
  }
}
export default roleEdit;
