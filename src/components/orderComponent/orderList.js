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
class orderList extends Component {
  constructor() {
    super();
    this.state = {
      isCheckedOrderAdd: true,
      locations: [],
      offset: 0,
      data: [],
      perPage: 15,
      currentPage: 0,
      locationsProducts:[]
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
                    isCheckedOrderAdd : resRole.data[i].isCheckedOrderAdd,
                  });
                  this.receivedData();

                  if (this.state.isCheckedOrderAdd == false) {
                    this.setState({
                      showStatus: true,
                    });
                  }
                   //productget
                   axios.get(`product/productlist`).then((resProduct) => {
                    this.setState({
                      locationsProducts: resProduct.data,
                    });
                  });
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
    axios.get(`order/orderlist`).then((res) => {
      const data = res.data;
      const slice = data.slice(
        this.state.offset,
        this.state.offset + this.state.perPage
      );
      const orderData = slice.map((listOrd) => (
        <React.Fragment>
          <tr>
          <td>{listOrd._id}</td>
            <td>{listOrd.companyName}</td>
            <td>{listOrd.companyStatusName}</td>
            <td>{listOrd.bidderName}</td>
            <td>{listOrd.productName}</td>
            <td>{listOrd.productPrice}</td>
            <td>{listOrd.stockNumber}</td>
            <td>{listOrd.totalName}</td>
            <td>{listOrd.orderState}</td>
            <td>
          
          <Link to={{ pathname : "/orderedit" , state :{ orderUpdate : listOrd} }}  className="btn btn-success btn-sm">  <span className="fa fa-plus"></span> Güncelle</Link>
          &nbsp;&nbsp;<button className="btn btn-danger btn-sm" onClick={()=>this.deleteOrder(listOrd)}>
          <span className="fa fa-trash"></span> Sil
          </button> 
        </td>
          </tr>
        </React.Fragment>
      ));

      this.setState({
        pageCount: Math.ceil(data.length / this.state.perPage),

        orderData,
      });
    });
  }
  //deleteOrder
  deleteOrder(data){
    
    confirmAlert({
        title: "Siparişi Sil",
        message: "Siparişi silmek istediğinize emin misiniz?",
        buttons: [
          {
            label: "Evet",
            onClick: () =>
            axios.post("order/orderdelete", {_id:data._id}).then((response) => {
            
              
              const locationsProducts =[...this.state.locationsProducts];    
              for(var i=0;i<locationsProducts.length;i++){
                if(data.productName==locationsProducts[i].productName)
                {
                  if(data.orderState=="Sipariş Gönderildi"){
                  var totalStock=0;
                  totalStock = data.stockNumber+locationsProducts[i].stockNumber;
                  const  stokNewUpdate={
                    productName:data.productName,
                    stockNumber :totalStock
            
                  }
                  
                 axios.put('product/pstokupdate', stokNewUpdate)
                  .then((response) => { 
                    
                  
                  })
                }
              }
              }
              toast.success("Silme işlemi başarılı! ");
                    setTimeout(
                     function () {
                       window.location.replace("/orderlist");
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
            onClick: () => this.props.history.push("/orderlist"),
          },
        ],
      });

  }
  render() {

    return (
      <div>
        <Header />
        <Menu />
        <div className="content-wrapper">  {this.state.isCheckedOrderAdd ? (
          <div className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-12">
                  <section className="content">
                    <div className="container-fluid">
                      <section class="content-header"></section>

                      <div className="card card-info">
                        <div className="card-header">
                          <h3 className="card-title">Tüm Siparişler </h3>
                        </div>

                      
      
        
                        <div className="card-body  p-0">
                      <div className="table-responsive">
                      
                       
                          <div className="col-sm-12">
                          <table className="table m-0">
                              <thead>
                                <tr role="row">
                                <th className="sorting">Sipariş Kodu</th>
                                <th className="sorting">Firma Adı</th>
                                  <th className="sorting_asc">Firma Yetkilisi</th>

                                  <th className="sorting">Sipariş Veren</th>
                                 
                                  <th className="sorting">Ürün Adı</th>
                                  <th className="sorting">Ürün Fiyatı</th>
                                  <th className="sorting">Ürün Adet</th>
                                  <th className="sorting">Toplam Fiyat</th>
                                  <th className="sorting">Sipariş Durumu</th>
                                  <th className="sorting">Ayarlar</th>
                                  

                                </tr>
                              </thead>
                              <tbody>
                              
                                {this.state.orderData}
                              </tbody>
                              <tfoot>
                                <tr>
                                <th className="sorting">Sipariş Kodu</th>
                                <th className="sorting">Firma Adı</th>
                                  <th className="sorting_asc">Firma Yetkilisi</th>
                                  <th className="sorting">Sipariş Veren</th>
                                  <th className="sorting">Ürün Adı</th>
                                  <th className="sorting">Ürün Fiyatı</th>
                                  <th className="sorting">Ürün Adet</th>
                                  <th className="sorting">Toplam Fiyat</th>
                                  <th className="sorting">Sipariş Durumu</th>
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
export default orderList;
