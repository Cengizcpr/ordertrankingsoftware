import React, { Component } from "react";
import Header from "../homeComponent/Header";
import Menu from "../homeComponent/Menu";
import jwt_decode from "jwt-decode";
import axios from "axios";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-awesome-modal";
class orderAdd extends Component {
  constructor(props) {
    super(props);
  
    if (this.props.location.state != undefined) {
      const { orderUpdate } = this.props.location.state;
      this.state = {
        companyName: orderUpdate.companyName,
        companyStatusName: orderUpdate.companyStatusName,
        userFullName: orderUpdate.bidderName,
        productName: orderUpdate.productName,
        productPrice: orderUpdate.productPrice,
        totalName:orderUpdate.totalName,
        _id: orderUpdate._id,
        stockNumber: orderUpdate.stockNumber,
        stockAll:"",
        orderState: orderUpdate.orderState,
        orderStateDb:orderUpdate.orderState,
        locationsCompany:[],
        rows:[],
        locationsProducts:[],
        totalOrder:0,
        selectedOptionProduct:orderUpdate.productName,
        selectStock:"sd",
        maxStock:0,
        visible: false,
        remainingOrder:0
      }
    }
      else{
        this.state = {
          companyName: "",
          companyStatusName: "",
          userFullName: "",
          productName: "",
          productPrice: "",
          totalName:"",
          _id: "",
          stockNumber:"",
          stockAll:"",
          orderState: "",
          locationsCompany:[],
          rows:[],
          locationsProducts:[],
          totalOrder:0,
          visible: false,
          remainingOrder:0
        }
      }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  openModal() {
    this.setState({
      visible: true,
    });

  }

  closeModal() {
    this.setState({
      visible: false,
    });
  }
  stokUpdateSubmit(e){
    e.preventDefault();   this.setState({
      visible:false
    })
      const stokProduct={
      productName:this.state.productName,
      stockNumber:this.state.remainingOrder
    }
    axios
           .put('product/pstokupdate',stokProduct)
           .then((res)=>{
             toast.success("Sipariş Gönderildi!");
          
           }).catch((err)=>{
             toast.err("Hata!Sipariş Gönderilemedi!")
           })
  }
  //change
  onChange(e) {  var total =1;
    total = this.state.productPrice*e.target.value;
    this.setState({ [e.target.name]: e.target.value,
      totalName:total
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
            var total = 0;
            total = this.state.productPrice * this.state.stockNumber;
            console.log(total)
            this.setState({
              userFullName: decoded.userFullName,
              totalName : total
            });
            var tokenRoleName = resUser.data[j].roleName;
            //Role Get
            axios.get("roles/rolelist").then((resRole) => {
              for (var i = 0; i < resRole.data.length; i++) {
                //UserModel == rolesModel
                if (tokenRoleName == resRole.data[i].roleName) {
                  this.setState({
                    isCheckedOrderAdd: resRole.data[i].isCheckedOrderAdd,
                  });
                }
              }
              //companyget
              axios.get(`company/companylist`).then((resCompany) => {
                this.setState({
                  locationsCompany: resCompany.data,
                });
              });
              //productget
              axios.get(`product/productlist`).then((resProduct) => {
                this.setState({
                  locationsProducts: resProduct.data,
                });
              });
              //stok sayısı
              axios
              .post(`product/productfind`, { productName: this.state.productName })
              .then((resProduct) => {
                
                this.setState({
                maxStock:resProduct.data[0].stockNumber,
               
                })
              
                
              });
            });
          }
        }
      });
    } catch (error) {
      window.location.replace("/");
    }
  }
  handleChangeState = (selectOrderState) =>{
  this.setState({
    orderState : selectOrderState.value
  })
  }
  handleValidation(){

  }
  onSubmit(e) {
    e.preventDefault();
    

    var updateOrder = {
        companyName: this.state.companyName,
        companyStatusName: this.state.companyStatusName,
        bidderName: this.state.userFullName,
        productPrice:this.state.productPrice,
        stockNumber: this.state.stockNumber,
        productName: this.state.productName,
        orderState: this.state.orderState,
        _id:this.state._id,
        totalName:this.state.totalName
      
      };
      this.setState({
        remainingOrder : this.state.maxStock-this.state.stockNumber
      })
      console.log(this.state.orderStateDb)
      axios
      .put(`order/orderupdate`,updateOrder)
      .then((resCompany) => {
        if(this.state.orderStateDb =="Sipariş Gönderildi"){
          toast.success("Güncelleme Başarılı!");
          setTimeout(
            function () {
              this.props.history.push("/orderlist");
            }.bind(this),
            2000
          );
        }
        else{
        if(this.state.orderState=="Sipariş Gönderildi" && this.state.remainingOrder>=0){
            
          this.openModal()
      }
      else if(this.state.remainingOrder<0){
        toast.error("Hata!Yeterli Stok Yok!");
      }
    }
      })

     }


  //Firmaseçfirmayetkilisi
  handleChangeCompany = (selectedOptionCompany) => {
    let stoCompanyName = "";
    this.setState({ selectedOptionCompany });
    stoCompanyName = selectedOptionCompany.value;
    axios
      .post(`company/companyfind`, { companyName: stoCompanyName })
      .then((resCompany) => {
        this.setState({
          companyName: stoCompanyName,
          companyStatusName: resCompany.data[0].companyStatusName,
        });
      });
  };
  
  handleChangeProduct =  (selectedOptionProduct) => {
    let selectedOption = "";
    this.setState({ selectedOptionProduct ,
   });
    selectedOption = selectedOptionProduct.value;
   
    axios
    .post(`product/productfind`, { productName: selectedOption })
    .then((resProduct) => {
      //ürün fiyat--------
      this.setState({
       productName:selectedOption,
        productPrice : resProduct.data[0].productPrice,
        maxStock:resProduct.data[0].stockNumber,
        selectStock:"",
       

      }) 
    });
  };

 

  render() {
    return (
      <div>
        <Header />
        <Menu />{" "}
        {this.state.isCheckedOrderAdd ? (
          <div className="content-wrapper">
            <div className="content">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-lg-12">
                    <section className="content">
                      <div className="container-fluid">
                        <section class="content-header"></section>

                        <div className="row">
                          <div className="col-md-12">
                            <div className="card card-default">
                              <div className="card-header">
                                <h3 className="card-title">Sipariş Güncelle</h3>
                                <div className="card-tools">
                                  <button
                                    type="button"
                                    className="btn btn-tool"
                                    data-card-widget="collapse"
                                  >
                                    <i className="fas fa-minus" />
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-tool"
                                    data-card-widget="remove"
                                  >
                                    <i className="fas fa-remove" />
                                  </button>
                                </div>
                              </div>
                              {/* /.card-header */}
                              <div className="card-body">
                                <div className="row">
                                  <div className="col-md-4">
                                    <div className="form-group">
                                      <label>Firma Adı</label>
                                      <Select
                                        onChange={this.handleChangeCompany}
                                        placeholder={this.state.companyName}
                                        name="selectedWires"
                                        options={this.state.locationsCompany.map(
                                          (data) => ({
                                            value: data.companyName,
                                            label: data.companyName,
                                          })
                                        )}
                                      />
                                    </div>
                                  </div>
                                  {/* /.form-group */}

                                  <div className="col-md-4">
                                    <div className="form-group">
                                      <label>Firma Yetkilisi : </label>
                                      <div className="input-group">
                                        <input
                                          type="text"
                                          className="form-control"
                                          name="companyStatusName"
                                          disabled
                                          value={this.state.companyStatusName}
                                          onChange={this.onChange}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-4">
                                    <div className="form-group">
                                      <label>Sipariş Oluşturan : </label>
                                      <div className="input-group">
                                        <input
                                          type="text"
                                          className="form-control"
                                          name="userFullName"
                                          disabled
                                          value={this.state.userFullName}
                                          onChange={this.onChange}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                               
                             
                              </div>
                              <div className="card-body">
                                <table className="table m-0 ">
                                  <thead>
                                    <tr role="row">
                                      <th>Ürün Adı</th>
                                      <th>Ürün Fiyatı</th>
                                      <th>Adet</th>
                                    
                                      <th>Toplam</th>  <th>Sipariş Durumu</th>
                                    </tr>
                                  </thead>
                                </table>
                                <br />
                                  <div className="row">
                                    <div className="col-md-2">
                                      <div className="form-group">
                                        <Select
                                          placeholder={this.state.productName}
                                          name="productName"
                                          options={this.state.locationsProducts.map(
                                            (data) => ({
                                              value: data.productName,
                                              label: data.productName,
                                            })
                                          )}
                                          onChange={this.handleChangeProduct}
                                        />
                                      </div>
                                    </div>
                                    <div className="col-md-2">
                                      <div className="form-group">
                                        <input
                                          type="text"
                                          className="form-control"
                                          name="productPrice"
                                          disabled
                                          value={this.state.productPrice}
                                          onChange={this.onChange}
                                        ></input>
                                      </div>
                                    </div>
                                 
                                    <div className="col-md-2">
                                      <div className="form-group">
                                        <input
                                          type="number"
                                          className="form-control"
                                          name="stockNumber"
                                          placeholder ={this.state.stockNumber}
                                          min="1"
                                         max={this.state.maxStock}
                                         
                                          value={this.state.stockNumber}
                                      
                                        onChange={this.onChange}
                                        ></input>
                                      </div>
                                    </div>
                                  
                                    <div className="col-md-2">
                                      <div className="form-group">
                                        <input
                                          type="text"
                                          name="totalName"
                                          value={this.state.totalName}
                                          onChange={this.onChange}
                                          className="form-control"
                                          disabled
                                        />
                                      </div>
                                    </div>{" "}
                                    <div className="col-md-3">
                                      <div className="form-group">
                                      <Select
                                          placeholder={this.state.orderState}
                                          name="orderState"
                                          options = {[
                                            {value: "Sipariş Kaydedildi", label: "Sipariş Kaydedildi"},
                                            {value: "Sipariş Gönderildi", label: "Sipariş Gönderildi"},
                                          ]}
                                          onChange={this.handleChangeState}
                                        />                                      </div>
                                    </div>{" "}
                                  </div>
                                  <div className="card-footer">
                                  <button
                                    type="submit"
                                    class="btn btn-success float-right"
                                    onClick={this.onSubmit}
                                    disabled={this.state.value}
                                  >
                                    {" "}
                                    <span className="fa fa-paper-plane"></span>
                                    Gönder
                                  </button>

                                </div>

                                
                              </div>
                            </div>
                          </div>
                        </div>
                      
                      </div>
                    </section>
                    <Modal
                    visible={this.state.visible}
                    width="600"
                    height="330"
                    effect="fadeInUp"
                    onClickAway={() => this.closeModal()}
                  >
                    <div class="modal-header">
                      {" "}
                      <h5>Uyarı</h5>
                      <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        onClick={() => this.closeModal()}
                      >
                        &times;
                      </button>
                    </div>
                    <div class="modal-body">
                      <p>Siparişi göndermek istediğinize eminmisiniz ?</p>
                      <p>Stok sayısı : {this.state.maxStock} </p>
                                        <p>Adet sayısı : {this.state.stockNumber}</p>
                      <p>Güncel stok sayısı : {this.state.remainingOrder}</p>
                    </div>
                    <div class="modal-footer">
                   
                      <button
                        type="button"
                        class="btn btn-default"
                        data-dismiss="modal"
                        onClick={() => this.closeModal()}
                      >
                        Kapat
                      </button>
                      <form
                          className="forms-sample"
                          onSubmit={this.stokUpdateSubmit.bind(this)}
                        >
                      <button
                       
                        class="btn btn-success"
                        data-dismiss="modal"
                        onSubmit={this.stokUpdateSubmit.bind(this)}
                      >
                        Kaydet
                      </button></form>
                    </div>
                  </Modal>
                  </div>
                </div>

                {this.state.addOrder}
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

export default orderAdd;
