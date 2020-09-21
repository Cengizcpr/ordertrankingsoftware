import React, { Component } from "react";
import Header from "../homeComponent/Header";
import Menu from "../homeComponent/Menu";
import jwt_decode from "jwt-decode";
import axios from "axios";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
class orderAdd extends Component {
  constructor() {
    super();
    this.state = {
      isCheckedOrderAdd: false,
      locationsCompany: [],
      selectedOptionCompany: null,
      rows: [],
      locationsProducts: [],
      selectStock: [],
      productPrice: [],
      textStock: [],
      productTotalPrice: [],
      totalOrderPrice: 0,
      handleChangeTotalProduct: [],
      totalName: [],
      productName: [],
      value: "",
      valueStock:"",
      success:[]
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  //change
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
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
            this.setState({
              userFullName: decoded.userFullName,
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
            });
          }
        }
      });
    } catch (error) {
      window.location.replace("/");
    }
  }
  handleValidation(){

    let companyName = this.state.companyName;
    const rows = [...this.state.rows];
    const selectStock = [...this.state.selectStock];

    let formIsValid = true;
    const productName = [...this.state.productName];
    for (var i = 0; i < rows.length; i++) {
        if(!productName[i]){
            toast.error("Hata!Lütfen Ürün Seçiniz!")
            formIsValid=false
        }
        else if(!companyName){
            toast.error("Hata!Lütfen Firma Seçiniz!")
            formIsValid=false
        }
        else if(!selectStock[i]){
            toast.error("Hata!Lütfen Ürün Adeti Seçiniz!")
            formIsValid=false
        }
    }
    return formIsValid;
   
  }
  //submit
  onSubmit(e) {
    e.preventDefault();
     if(this.handleValidation()){
    const rows = [...this.state.rows];
    const selectStock = [...this.state.selectStock];
    const textStock = [...this.state.textStock];
    const productPrice = [...this.state.productPrice];
    const productName = [...this.state.productName];
    const totalName = [...this.state.totalName];


    for (var i = 0; i < rows.length; i++) {
      var newOrder = {
        companyName: this.state.companyName,
        companyStatusName: this.state.companyStatusName,
        bidderName: this.state.userFullName,
        productPrice: productPrice[i],
        stockNumber: selectStock[i],
        productName: productName[i],
        orderState: "Sipariş Kaydedildi",
        textStock :textStock[i],
        totalName : totalName[i]
        
      
      };
    
     
      this.setState({
        selectStock,
        textStock,
        
    })   
     
      //ordregis
      axios.post("order/orderregister", newOrder).then((response) => {
        const success = [...this.state.success];

        if (response.request.response == "true") {
          this.setState({
            value: "Kayıt",
          });
          toast.success("Siparişleriniz Değerlendirmeye Alındı! ");
          setTimeout(
            function () {
              this.props.history.push("/orderlist");
            }.bind(this),
            2000
          );
         
        
         
     
    
        } else if (response.request.response == "false") {
          toast.error("Hata!Sipariş Kayıtları Başarısız! ");
        }
      });
    }
   

    }
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
  handleChangeStock = (idx) => (e) => {
    const selectStock = [...this.state.selectStock];
    const productPrice = [...this.state.productPrice];
    const totalName = [...this.state.totalName];
    selectStock[idx] = e.target.value;
    var total = productPrice[idx] * selectStock[idx];
    var totalAll = 0;
    totalName[idx] = total;
    this.setState({
      totalName,
      selectStock,
      productPrice,
    });
    for (var i = 0; i < this.state.rows.length; i++) {
      totalAll += totalName[i];
      this.setState({
        totalOrderPrice: totalAll,
      });
    }
  };
  handleChangeProduct = (idx) => (e) => {
    const productPrice = [...this.state.productPrice];
    const textStock = [...this.state.textStock];
    const productName = [...this.state.productName];
    productName[idx] = e.value;
    this.setState({
      productName,
    });
    axios
      .post(`product/productfind`, { productName: e.value })
      .then((resProduct) => {
        //ürün fiyat--------
        productPrice[idx] = resProduct.data[0].productPrice;

        this.setState({
          productPrice,
       
         
        });
        //-------------------
        if (resProduct.data[0].stockNumber > 0) {
          //stoksayısıtext
          textStock[idx] = resProduct.data[0].stockNumber;
          this.setState({
            textStock,
            valueStock:""
          });
        } else {
          toast.error("Ürün stok boş");
          this.setState({
              valueStock:"true"
          })
        }
      });
  };

  //tablerow
  handleChangeTable = (idx) => (e) => {
    const { name, value } = e.target;
    const rows = [...this.state.rows];
    rows[idx] = {
      [name]: value,
    };
    this.setState({
      rows,
    });
  };
  //satır ekleme
  handleAddRow = () => {
    const item = {
      name: "",
      totalName: 0,
    };

    this.setState({
      rows: [...this.state.rows, item],
    });
  };
  //satır remove
  handleRemoveRow = () => {
    this.setState({
      rows: this.state.rows.slice(0, -1),
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
                                <h3 className="card-title">Sipariş Oluştur</h3>
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
                                        placeholder="Firma Seçiniz"
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
                                <div className="col-md-4">
                                  <div>
                                    <div></div>
                                  </div>
                                </div>{" "}
                                <div className="card-footer">
                                  <button
                                    type="submit"
                                    class="btn btn-info float-left"
                                    onClick={this.onSubmit}
                                    disabled={this.state.value}
                                  >
                                    {" "}
                                    <span className="fa fa-save"></span>
                                    Kaydet
                                  </button>

                                  <button
                                    type="submit"
                                    class="btn btn-info float-right"
                                    onClick={this.handleAddRow}
                                  >
                                    <span className="fas fa-plus"></span>
                                    Ekle
                                  </button>
                                  <button
                                    type="submit"
                                    class="btn btn-danger float-right"
                                    onClick={this.handleRemoveRow}
                                  >
                                    <span className="fa fa-times"></span>
                                    Sil
                                  </button>
                                </div>
                              </div>
                              <div className="card-body">
                                <div className="row"></div>
                                <table className="table m-0 ">
                                  <thead>
                                    <tr role="row">
                                      <th>Ürün Adı</th>
                                      <th>Ürün Fiyatı</th>
                                      <th>Stok Sayısı</th>
                                      <th>Adet</th>

                                      <th>Toplam</th>
                                    </tr>
                                  </thead>
                                </table>
                                <br />
                                {this.state.rows.map((item, idx) => (
                                  <div className="row">
                                    <div className="col-md-2">
                                      <div className="form-group">
                                        <Select
                                          onChange={this.handleChangeProduct(
                                            idx
                                          )}
                                          key={idx}
                                          placeholder="Seçiniz"
                                          name="selectedProducSt"
                                          options={this.state.locationsProducts.map(
                                            (data) => ({
                                              value: data.productName,
                                              label: data.productName,
                                            })
                                          )}
                                        />
                                      </div>
                                    </div>
                                    <div className="col-md-3">
                                      <div className="form-group">
                                        <input
                                          type="text"
                                          className="form-control"
                                          name="productPrice"
                                          disabled
                                          value={this.state.productPrice[idx]}
                                          onChange={this.onChange}
                                        ></input>
                                      </div>
                                    </div>
                                    <div className="col-md-3">
                                      <div className="form-group">
                                        <input
                                          type="text"
                                          className="form-control"
                                          name="textStock"
                                          disabled
                                          value={this.state.textStock[idx]}
                                          onChange={this.onChange}
                                        ></input>
                                      </div>
                                    </div>
                                    <div className="col-md-2">
                                      <div className="form-group">
                                        <input
                                          type="number"
                                          className="form-control"
                                          name="selectStock"
                                          placeholder="Adet Seçiniz"
                                          min="1"
                                          disabled={this.state.valueStock}
                                          value={this.state.selectStock[idx]}
                                          max={this.state.textStock[idx]}
                                          onChange={this.handleChangeStock(idx)}
                                        ></input>
                                      </div>
                                    </div>
                                    <div className="col-md-2">
                                      <div className="form-group">
                                        <input
                                          type="text"
                                          name="totalName"
                                          value={this.state.totalName[idx]}
                                          onChange={this.onChange}
                                          className="form-control"
                                          disabled
                                        />
                                      </div>
                                    </div>{" "}
                                  </div>
                                ))}

                                <div className="form-group">
                                  {" "}
                                  <label className="float-right">
                                    Toplam : {this.state.totalOrderPrice} ₺
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      
                      </div>
                    </section>
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
