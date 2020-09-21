import React, { Component } from "react";
import Header from "../homeComponent/Header";
import Menu from "../homeComponent/Menu";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
class productAdd extends Component {
  constructor() {
    super();
    this.state = {
      isCheckedProductAdd: false,
      productImage: "",
    };
    this.onFileChange = this.onFileChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  //image
  onFileChange(e) {
    this.setState({ productImage: e.target.files[0] });
  }
  //change
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
    //Validation
    handleValidation() {
      let productName = this.state.productName;
      let productCode = this.state.productCode;
      let productDescription = this.state.productDescription;
      let productPrice = this.state.productPrice;
      let stockNumber = this.state.stockNumber;
     
      let formIsValid = true;
    
      //Boş alan kontrol
      if (
        !productName ||
        !productCode ||
        !productDescription ||
        !productPrice ||
        !stockNumber 
      ) {
        formIsValid = false;
        toast.error("Boş alan bırakmayınız !!");
      } 
  
      return formIsValid;
    }
  //submit
  onSubmit(e){
    e.preventDefault();
    if(this.handleValidation()){
    const formData = new FormData()
    formData.append('productImage', this.state.productImage)
    const newFailures= {
     productName:this.state.productName,
     productCode:this.state.productCode,
     productDescription:this.state.productDescription,
     productPrice:this.state.productPrice,
     stockNumber:this.state.stockNumber,
     formData
      
    }
    axios.post('product/productregister', newFailures)
    .then((response) => {
     axios.put('product/proimage',formData)
    .then((response) => {
      setTimeout(
        function () {
          window.location.replace("/productlist");
        }.bind(this),
        5000
      );
      toast.success("Kayıt Başarılı! ");
    })
    
   
    
    }).catch((error) => { 
      toast.error("Kayıt Başarısız! ");
  });   
}
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
                    isCheckedProductAdd: resRole.data[i].isCheckedProductAdd,
                  });
                  if (this.state.isCheckedProductAdd == false) {
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
        {this.state.isCheckedProductAdd ? (
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
                            <div className="card card-success">
                              <div className="card-header">
                                <h3 className="card-title">Ürün Oluştur</h3>
                              </div>
                              <div className="card-body">
                                <div className="form-group">
                                  <label>Ürün Adı : </label>
                                  <div className="input-group">
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="productName"
                                      placeholder="Ürün Adını Giriniz:"
                                      value={this.state.productName}
                                      onChange={this.onChange}
                                    />
                                    <div className="input-group-prepend">
                                      <span className="input-group-text">
                                        <i className="fas fa-hockey-puck" />
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                <div className="form-group">
                                  <label>Ürün Kodu : </label>
                                  <div className="input-group">
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="productCode"
                                      placeholder="Ürün kodu Giriniz:"
                                      value={this.state.productCode}
                                      onChange={this.onChange}
                                    />
                                    <div className="input-group-prepend">
                                      <span className="input-group-text">
                                        <i className="fas fa-barcode" />
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <label>Ürün Açıklaması : </label>
                                  <div className="input-group">
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="productDescription"
                                      placeholder="Ürün Açıklaması Giriniz:"
                                      value={this.state.productDescription}
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
                                  <label>Ürün Fiyat: </label>
                                  <div className="input-group">
                                    <input
                                      type="number"
                                      min="1"
                                      className="form-control"
                                      name="productPrice"
                                      placeholder="Ürün Fiyatı Giriniz:"
                                      value={this.state.productPrice}
                                      onChange={this.onChange}
                                    />
                                    <div className="input-group-prepend">
                                      <span className="input-group-text">
                                        <i className="fas fa-money-bill-alt" />
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <label>Stok Sayısı : </label>
                                  <div className="input-group">
                                    <input
                                      type="number"
                                      min="1"
                                      className="form-control"
                                      name="stockNumber"
                                      placeholder="Stok Sayısı Giriniz:"
                                      value={this.state.stockNumber}
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
                                  <label>Ürün Resmi : </label>
                                  <div className="input-group">
                                    <input
                                      type="file"
                                      value={this.state.file}
                                      class="form-control-file"
                                      onChange={this.onFileChange}
                                    />
                                  </div>
                                </div>

                                <button
                                  type="submit"
                                  className="btn btn-success"
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
export default productAdd;
