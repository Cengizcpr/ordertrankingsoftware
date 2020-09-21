import React, { Component } from "react";
import Header from "../homeComponent/Header";
import Menu from "../homeComponent/Menu";
import jwt_decode from "jwt-decode";
import axios from "axios";
import ReactPaginate from "react-paginate";
import "../../Css/paginatStyle.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Link } from "react-router-dom";
class productList extends Component {
  constructor() {
    super();
    this.state = {
      isCheckedProductList: false,
      offset: 0,
      data: [],
      perPage: 5,
      currentPage: 0,
    };
    this.handlePageClick = this.handlePageClick.bind(this);
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
    axios.get(`product/productlist`).then((res) => {
      const data = res.data;
      const slice = data.slice(
        this.state.offset,
        this.state.offset + this.state.perPage
      );
      const postData = slice.map((productLis) => (
        <React.Fragment>
          <tr>
            <td><img src={require(('../../uploads/'+productLis.productImage ))} style={{width: '200px',height:'100px'}}/></td>
            <td>{productLis.productName}</td>
            <td>{productLis.productCode}</td>
            <td>{productLis.productDescription}</td>
            <td>{productLis.productPrice}</td>
            <td>{productLis.stockNumber}</td>
            <td>
          
          <Link to={{ pathname : "/productedit" , state :{ productsUpdate : productLis} }}  className="btn btn-success btn-sm">  <span className="fa fa-plus"></span> Güncelle</Link>
          &nbsp;&nbsp;<button className="btn btn-danger btn-sm" onClick={()=>this.deleteProduct(productLis)}>
          <span className="fa fa-trash"></span> Sil
          </button> 
        </td>
          </tr>
        </React.Fragment>
      ));

      this.setState({
        pageCount: Math.ceil(data.length / this.state.perPage),

        postData,
      });
    });
  }
      //deleteProduct
      deleteProduct(data){
        console.log(data._id)
        confirmAlert({
            title: "Ürün Sil",
            message: "Ürünü silmek istediğinize emin misiniz?",
            buttons: [
              {
                label: "Evet",
                onClick: () =>
                axios.post("product/productdelete", {_id:data._id}).then((response) => {
                    //Kullanıcılar silme işlemi  
                           toast.success("Silme işlemi başarılı! ");
                           setTimeout(
                            function () {
                              window.location.replace("/productlist");
                            }.bind(this),
                            1500
                          );
                       }),
              },
              {
                label: "Hayır",
                onClick: () => this.props.history.push("/productlist"),
              },
            ],
          });
    
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
                    isCheckedProductList: resRole.data[i].isCheckedProductList,
                  });
                  this.receivedData();
                  if (this.state.isCheckedProductList == false) {
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
        {this.state.isCheckedProductList ? (
          <div className="content-wrapper">
            {/* Content Header (Page header) */}
            <section className="content-header">
              <div className="container-fluid"></div>
            </section>

            <section className="content">
              <div className="row">
                <div className="col-12">
                  <div className="card card-success">
                    <div className="card-header">
                      <h3 className="card-title">
                        Ürünler
                      </h3>
                    </div>

                    <div className="card-body  p-0">
                      <div className="table-responsive">
                      
                       
                          <div className="col-sm-12">
                          <table className="table m-0">
                              <thead>
                                <tr role="row">
                                <th className="sorting">Ürün Resmi</th>
                                  <th className="sorting_asc">Ürün Adı</th>
                                  <th className="sorting">Ürün Kodu</th> 
                                  <th className="sorting">Ürün Açıklaması</th>
                                  <th className="sorting">Ürün Fiyat</th>
                                  <th className="sorting">Stok Sayısı</th>
                                  <th className="sorting">Ayarlar</th>                                                                    
                                </tr>
                              </thead>
                              <tbody>
                              
                                {this.state.postData}
                              </tbody>
                              <tfoot>
                              <tr role="row">
                                <th className="sorting">Ürün Resmi</th>
                                  <th className="sorting_asc">Ürün Adı</th>
                                  <th className="sorting">Ürün Kodu</th>             
                                  <th className="sorting">Ürün Açıklaması</th>
                                  <th className="sorting">Ürün Fiyat</th>
                                  <th className="sorting">Stok Sayısı</th>
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
              </div>
            </section>
          </div>
        ) : null}
        {this.state.showStatus ? this.props.history.push("/statuserror") : null}
        <ToastContainer />

      </div>
    );
  }
}
export default productList;
