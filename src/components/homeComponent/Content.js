import React ,{Component} from "react";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
import Calendar from 'react-calendar';

class Content extends Component {
  constructor() {
    super();
    this.state={
      userList:0,
      companyList:0,
      waitOrder:0,
      successOrder:0,
      locationsOrder:[],
      date: new Date(),
       
    }
  }  onChange = date => this.setState({ date })

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
              var tokenRoleName= resUser.data[j].roleName;
              var tokenUserName =resUser.data[j].userFullName;
              //Role Get
             axios.get("roles/rolelist").then((resRole) => {
                for (var i = 0; i < resRole.data.length; i++) {
                  
                  //UserModel == rolesModel 
                  if(tokenRoleName==resRole.data[i].roleName)
                  {
                   
                    if (resRole.data[i].isCheckedOrderList == false) {
                      
                      axios
                      .post("order/orderfind",{bidderName:tokenUserName}).then((resOrder)=>{
                       
                          this.setState({
                            locationsOrder:resOrder.data
                          })
                        
                      })
                    }
                    else{
                      axios.get(`order/orderlist`).then((resOrder) => {
                      this.setState({
                        locationsOrder:resOrder.data
                      })
                      })
                    }
                  }
                }
              })
            }
          }
     
        this.setState({
          userList:resUser.data.length
        })
      })
       //companyget
       axios.get(`company/companylist`).then((resCompany) => {
        this.setState({
          companyList: resCompany.data.length,
        });
      });
         //orderget
         axios.get(`order/orderlist`).then((resOrder) => {
           var swLength=0,soLength=0;
      
         for(var i=0;i<resOrder.data.length;i++){
           if(resOrder.data[i].orderState=="Sipariş Kaydedildi"){
            swLength++;
            this.setState({
              waitOrder:swLength
            }) 
          }
          
          else if(resOrder.data[i].orderState=="Sipariş Gönderildi"){
          soLength++;
          this.setState({
            successOrder:soLength
          })
          }
         }
        });
      } catch (error) {
        window.location.replace("/");
      }
    }
    render(){
      const orders = this.state.locationsOrder.map((data) => (
        <tr key={data._id}>
          <td>{data.companyName}</td>
          <td>{data.bidderName}</td>
          <td>{data.productName}</td>
          <td>{data.orderState}</td> 
        </tr>
        ));

  return (
    <div className="content-wrapper" style={{minHeight:"100%"}}>
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0 text-dark">Anasayfa</h1>
            </div>
           
          </div>
        </div>
      </div>
      <div className="content">
        <div className="container-fluid">
         
           
        <div className="row">
  <div className="col-lg-3 col-6">
    {/* small box */}
    <div className="small-box bg-info">
      <div className="inner">
        <h3>{this.state.userList}</h3>
        <p>Kullanıcılar</p>
      </div>
      <div className="icon">
        <i className="fas fa-users" />
      </div>
      <Link to="/userslist" className="small-box-footer">Daha Fazla Bilgi<i className="fas fa-arrow-circle-right" /></Link>
    </div>
  </div>
  {/* ./col */}
  <div className="col-lg-3 col-6">
    {/* small box */}
    <div className="small-box bg-success">
      <div className="inner">
  <h3>{this.state.successOrder}</h3>
        <p>Onaylanan Siparişler</p>
      </div>
      <div className="icon">
        <i className="fa fa-check" />
      </div>
      <Link to="/orderlist" className="small-box-footer">Daha Fazla Bilgi<i className="fas fa-arrow-circle-right" /></Link>
    </div>
  </div>
  {/* ./col */}
  <div className="col-lg-3 col-6">
    {/* small box */}
    <div className="small-box bg-warning">
      <div className="inner">
        <h3>{this.state.waitOrder}</h3>
        <p>Bekleyen Siparişler</p>
      </div>
      <div className="icon">
        <i className="fa fa-spinner" />
      </div>
      <Link to="/orderlist" className="small-box-footer">Daha Fazla Bilgi<i className="fas fa-arrow-circle-right" /></Link>
    </div>
  </div>
  {/* ./col */}
  <div className="col-lg-3 col-6">
    {/* small box */}
    <div className="small-box bg-danger">
      <div className="inner">
        <h3>{this.state.companyList}</h3>
        <p>Firmalar</p>
      </div>
      <div className="icon">
        <i className="fas fa-building" />
      </div>
      <Link to="/companylist" className="small-box-footer">Daha Fazla Bilgi <i className="fas fa-arrow-circle-right" /></Link>
    </div>
  </div>
  {/* ./col */}
</div>
<div className="row">
<div className="col-md-9">
 
  
  <div className="card">
    <div className="card-header border-transparent">
      <h3 className="card-title">Siparişler</h3>
      <div className="card-tools">
        <button type="button" className="btn btn-tool" data-card-widget="collapse">
          <i className="fas fa-minus" />
        </button>
        <button type="button" className="btn btn-tool" data-card-widget="remove">
          <i className="fas fa-times" />
        </button>
      </div>
    </div>
    {/* /.card-header */}
    <div className="card-body p-0">
      <div className="table-responsive">
        <table className="table m-0">
          <thead>
            <tr>
              <th>Firma Adı</th>
              <th>Sipariş Veren</th>

              <th>Ürün Adı</th>
              <th>Sipariş Durumu</th>
            </tr>
          </thead>
          <tbody>
           {orders}
         
          </tbody>
        </table>
      </div>
    </div>
    <div className="card-footer clearfix">
    <Link to="/orderadd" className="btn btn-sm btn-info float-left">Sipariş Oluştur</Link>
      <Link to="/orderlist" className="btn btn-sm btn-secondary float-right">Siparişleri Listele</Link>
    </div>
  </div>
</div>

<div className="col-md-3">
<div className="bg-gradient-success">
  <div className="card-header border-0 ui-sortable-handle" style={{cursor: 'move'}}>
    <h3 className="card-title">
      <i className="far fa-calendar-alt" />
      Takvim
    </h3>
    <div className="card-tools">
    
      <button type="button" className="btn btn-success btn-sm" data-card-widget="collapse">
        <i className="fas fa-minus" />
      </button>
      <button type="button" className="btn btn-success btn-sm" data-card-widget="remove">
        <i className="fas fa-times" />
      </button>
    </div>
  </div>
  <div className="card-body pt-0">
  <Calendar
          onChange={this.onChange}
          value={this.state.date}
        />
  </div>
</div>

</div>
</div>

         
         
        </div>
     
      </div>
     
    </div>
  );
}
}
export default Content;