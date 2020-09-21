import React , {Component} from "react";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { decode } from "jsonwebtoken";

class Menu extends Component {
  constructor(){
    super();
    this.state ={
      isCheckedUserAdd : false
    }
  
  }
  logOut(e) {
    e.preventDefault();
    localStorage.removeItem("usertoken");
    console.log("token silindi");
    window.location.replace("/");
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
                      isCheckedUserAdd:resRole.data[i].isCheckedUserAdd,
                      isCheckedUserAdd: resRole.data[i].isCheckedUserAdd,
                      isCheckedUserAdd: resRole.data[i].isCheckedUserAdd,
                      isCheckedUserEdit: resRole.data[i].isCheckedUserEdit,
                      isCheckedUserList: resRole.data[i].isCheckedUserList,
                      isCheckedCompanyAdd: resRole.data[i].isCheckedCompanyAdd,
                      isCheckedCompanyEdit: resRole.data[i].isCheckedCompanyEdit,
                      isCheckedCompanyList:resRole.data[i].isCheckedCompanyList,
                      isCheckedProductAdd: resRole.data[i].isCheckedProductAdd,
                      isCheckedProductEdit:resRole.data[i].isCheckedProductEdit,
                      isCheckedProductList: resRole.data[i].isCheckedProductList,
                      isCheckedOrderAdd: resRole.data[i].isCheckedOrderAdd,
                      isCheckedOrderEdit: resRole.data[i].isCheckedOrderEdit,
                      isCheckedOrderList:resRole.data[i].isCheckedOrderList,
                      isCheckedRoleAdd: resRole.data[i].isCheckedRoleAdd,
                      isCheckedRoleEdit: resRole.data[i].isCheckedRoleEdit,
                      
                    })
                  }

                }
              })
            }
          }
        });
      } catch (error) {
        window.location.replace("/");
      }
    }
  
  render() {
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4" style={{minHeight:"1350px"}}>
      <p className="brand-link">
        <img
          src="logo2-yazısız.png"
          alt="Sipariş Takip"
          className="brand-image img-circle elevation-3"
          style={{ opacity: ".8" }}
        />
        <span className="brand-text font-weight-light">Sipariş Takip Yazılım</span>
      </p>
      <div className="sidebar">
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img
              src="dist/img/user2-160x160.jpg"
              className="img-circle elevation-2"
              alt=" BMM Bilişim"
            />
          </div>
          <div className="info">
            <a href="" className="d-block">
              BMM Bilişim Medikal
            </a>
          </div>
        </div>
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            <li className="nav-item has-treeview">
              <Link to="/home" className="nav-link" >
                <i className="nav-icon fas fa-home" />
                <p >Anasayfa</p>
              </Link>
            </li>
            <li className="nav-item has-treeview">
            <a href="" className="nav-link">
                <i className="nav-icon fas fa-users" />
                <p>
                  Kullanıcılar
                  <i className="right fas fa-angle-left" />
                </p>
              </a>
              <ul className="nav nav-treeview">
              {this.state.isCheckedUserAdd ? (
                <li className="nav-item">
                  <Link to="/userregister" className="nav-link">
                    <i className="fa fa-user-plus" />
                    <p>Kullanıcı Ekle</p>
                  </Link>
                </li> ) : null}
                {this.state.isCheckedUserList ? (
                <li className="nav-item">
                  <Link to="/userslist" className="nav-link">
                    <i className="fa fa-user-friends" />
                    <p>Kullanıcıları Listele</p>
                  </Link>
                </li> ) : null}
                {this.state.isCheckedRoleAdd ? (
                <li className="nav-item">
                  <Link to="/roleadd" className="nav-link">
                    <i className="fab fa-black-tie" />
                    <p>Yetki Düzenle</p>
                  </Link>
                </li>) : null}
              </ul>
            </li>
            <li className="nav-item has-treeview">
            <a href="" className="nav-link">
                <i className="nav-icon fas fa-university" />
                <p >
                  Firmalar
                  <i className="right fas fa-angle-left" />
                </p>
              </a>
              <ul className="nav nav-treeview">
              {this.state.isCheckedCompanyAdd ? (
                <li className="nav-item">
                  <Link to="/companyadd" className="nav-link">
                    <i className="fas fa-building" />
                    <p>Firma Ekle</p>
                  </Link>
                </li>) : null}
                {this.state.isCheckedCompanyList ? (
                <li className="nav-item">
                  <Link to="/companylist" className="nav-link">
                    <i className="fas fa-city" />
                    <p>Firmaları Listele</p>
                  </Link>
                </li>) : null}
              </ul>
            </li>
            <li className="nav-item has-treeview">
            <a href="" className="nav-link">
                <i className="nav-icon fas fa-store" />
                <p >
                  Ürünler
                  <i className="right fas fa-angle-left" />
                </p>
              </a>
              <ul className="nav nav-treeview">
              {this.state.isCheckedProductAdd ? (
                <li className="nav-item">
                  <Link to="/productadd" className="nav-link">
                    <i className="fas fa-cash-register" />
                    <p>Ürün Ekle</p>
                  </Link>
                </li>) : null}
                  {this.state.isCheckedProductList? (
                <li className="nav-item">
                  <Link to="/productlist" className="nav-link">
                    <i className="fas fa-clipboard-list" />
                    <p>Ürünleri Listele</p>
                  </Link>
                </li>) : null}
              </ul>
            </li>
            <li className="nav-item has-treeview">
            <a href="" className="nav-link">
                <i className="nav-icon fas fa-shopping-cart" />
                <p >
                  Siparişler
                  <i className="right fas fa-angle-left" />
                </p>
              </a>
              <ul className="nav nav-treeview">
              {this.state.isCheckedOrderAdd ? (  
              <li className="nav-item">
                  <Link to="/orderadd" className="nav-link">
                    <i className="fas fa-edit" />
                    <p>Sipariş Oluştur</p>
                  </Link>
                </li>) : null}
                {this.state.isCheckedOrderList ? (
                <li className="nav-item">
                  <Link to="/orderlist" className="nav-link">
                    <i className="fas fa-clipboard" />
                    <p>Siparişleri Listele</p>
                  </Link>
                </li>) : null}
              </ul>
            </li>
            <li className="nav-item has-treeview">
            <a href="" className="nav-link">
                <i className="nav-icon fas fa-lock" />
                <p >
                  Hesabım
                  <i className="right fas fa-angle-left" />
                </p>
              </a>
              <ul className="nav nav-treeview">
           
            <li className="nav-item" >
            <Link
                to="/"
                className="nav-link"
                onClick={this.logOut.bind(this)}
              > <i className="nav-icon fas fa-key" />
                <p >Çıkış Yap</p>
              </Link>
              
            </li>
            </ul>
            </li>
           
          </ul>
        </nav>
      </div>
    </aside>
  );
  }
}
export default Menu;