import React, { Component } from "react";
import Header from "../homeComponent/Header";
import Menu from "../homeComponent/Menu";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import ReactPaginate from "react-paginate";
import "../../Css/paginatStyle.css";
class companyList extends Component {
  constructor() {
    super();
    this.state = {
      isCheckedCompanyEdit: true,
      locations: [],
      offset: 0,
      data: [],
      perPage: 15,
      currentPage: 0,

    };
    this.handlePageClick = this.handlePageClick.bind(this);

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
              for (var i = 0; i < resRole.data.length; i++) {
                
                //UserModel == rolesModel 
                if(tokenRoleName==resRole.data[i].roleName)
                {
                  this.setState({
                    isCheckedCompanyList: resRole.data[i].isCheckedCompanyList,
                  });
                  this.receivedData();

                  if (this.state.isCheckedCompanyList == false) {
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
   //handleclick
   handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState(
      {
        currentPage: selectedPage,
        offset: offset,
      },
      () => {
        this.receivedData();
      }
    );
  };
  //productlist paginator
  receivedData() {
    axios.get(`company/companylist`).then((res) => {
      const data = res.data;
      const slice = data.slice(
        this.state.offset,
        this.state.offset + this.state.perPage
      );
      const companyData = slice.map((companyLis) => (
        <React.Fragment>
          <tr>
            <td>{companyLis.companyName}</td>
            <td>{companyLis.companyStatusName}</td>
            <td>{companyLis.taxCircle}-{companyLis.taxNumber}</td>
            <td>{companyLis.companyEmail}</td>
            <td>{companyLis.companyPhoneNo}</td>
            <td>{companyLis.companyAdress}</td>
            <td>
          
          <Link to={{ pathname : "/companyedit" , state :{ companyUpdate : companyLis} }}  className="btn btn-success btn-sm">  <span className="fa fa-plus"></span> Güncelle</Link>
          &nbsp;&nbsp;<button className="btn btn-danger btn-sm" onClick={()=>this.deleteCompany(companyLis)}>
          <span className="fa fa-trash"></span> Sil
          </button> 
        </td>
          </tr>
        </React.Fragment>
      ));

      this.setState({
        pageCount: Math.ceil(data.length / this.state.perPage),

        companyData,
      });
    });
  }
  //deleteCompany
  deleteCompany(data){
   
    confirmAlert({
        title: "Firma Sil",
        message: "Firmayı silmek istediğinize emin misiniz?",
        buttons: [
          {
            label: "Evet",
            onClick: () =>
            axios.post("company/companydelete", {_id:data._id}).then((response) => {
                //Kullanıcılar silme işlemi  
                       toast.success("Silme işlemi başarılı! ");
                       setTimeout(
                        function () {
                          window.location.replace("/companylist");
                        }.bind(this),
                        1500
                      );
                   })
                   .catch((err)=>{
                     toast.error("Hata!Silme işlemi başarısız!")
                   })
          },
          {
            label: "Hayır",
            onClick: () => this.props.history.push("/companylist"),
          },
        ],
      });

  }
  render() {

    return (
      <div>
        <Header />
        <Menu />
        <div className="content-wrapper">  {this.state.isCheckedCompanyList ? (
          <div className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-12">
                  <section className="content">
                    <div className="container-fluid">
                      <section class="content-header"></section>

                      <div className="card card-danger">
                        <div className="card-header">
                          <h3 className="card-title">Tüm Firmalar </h3>
                        </div>

                      
      
        
                        <div className="card-body  p-0">
                      <div className="table-responsive">
                      
                       
                          <div className="col-sm-12">
                          <table className="table m-0">
                              <thead>
                                <tr role="row">
                                <th className="sorting">Firma Adı</th>
                                  <th className="sorting_asc">Firma Yetkilisi</th>

                                  <th className="sorting">Vergi Dairesi-Numarası</th>
                                 
                                  <th className="sorting">Firma Email</th>
                                  <th className="sorting">Firma Telefon</th>
                                  <th className="sorting">Firma Adres</th>
                                  <th className="sorting">Ayarlar</th>
                                  

                                </tr>
                              </thead>
                              <tbody>
                              
                                {this.state.companyData}
                              </tbody>
                              <tfoot>
                                <tr>
                                <th className="sorting">Firma Adı</th>
                                  <th className="sorting_asc">Firma Yetkilisi</th>

                                  <th className="sorting">Vergi Dairesi-Numarası</th>
                                 
                                  <th className="sorting">Firma Email</th>
                                  <th className="sorting">Firma Telefon</th>
                                  <th className="sorting">Firma Adres</th>
                                  <th className="sorting">Ayarlar</th>
                                </tr>
                              </tfoot>
                            </table>
                          </div>
                        
                        <div className="row">
                          <div className="col-sm-12 col-md-5">
                           
                          </div>
                          <div className="col-sm-12 col-md-7">
                            <div
                              className="dataTables_paginate paging_simple_numbers"
                              id="example2_paginate"
                            >
                            <ReactPaginate
                  previousLabel={"Önceki"}
                  nextLabel={"Sonraki"}
                  breakLabel={"..."}
                  breakClassName={"break-me"}
                  pageCount={this.state.pageCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={this.handlePageClick}
                  containerClassName={"pagination"}
                  subContainerClassName={"pages pagination"}
                  activeClassName={"active"}/>
                               
                            </div>
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
          </div>  ) : null}
          {this.state.showStatus ? this.props.history.push("/statuserror") : null}

        </div>
        <ToastContainer />
       
      </div>
    );
  }
}
export default companyList;
