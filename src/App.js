import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import loginComponent from "./components/loginComponent/Login"
import homeComponent from "./components/homeComponent/Home"
import userListComponent from "./components/userComponent/userList"
import userAddComponent from "./components/userComponent/userRegister"
import userUpdateComponent from "./components/userComponent/userUpdate"
import roleAddComponent from "./components/userComponent/roleAdd"
import roleEditComponent from "./components/userComponent/roleEdit"
import companyAddComponent from "./components/companyComponent/companyAdd"
import companyListComponent from "./components/companyComponent/companyList"
import CompanyEditComponent from "./components/companyComponent/companyEdit"
import orderAddComponent from "./components/orderComponent/orderAdd"
import orderListComponent from "./components/orderComponent/orderList"
import orderEditComponent from "./components/orderComponent/orderEdit"
import productAddComponent from "./components/productComponent/productAdd"
import productEditComponent from "./components/productComponent/productEdit"
import productListComponent from "./components/productComponent/productList"
import notFound from "./components/settingComponent/notFound"
import statusError from "./components/settingComponent/statusError"


function App() {
  return (
   <Router>
     <Switch>
       <Route exact path="/" component={loginComponent}/>
       <Route exact path="/home" component={homeComponent}/>
       <Route exact path="/userregister" component={userAddComponent}/>
       <Route exact path="/userslist" component={userListComponent}/>
       <Route exact path="/userupdate" component={userUpdateComponent}/>
       <Route exact path="/roleadd" component={roleAddComponent}/>
       <Route exact path="/roleedit" component={roleEditComponent}/>
       <Route exact path="/companyadd" component={companyAddComponent}/>
       <Route exact path="/companylist" component={companyListComponent}/>
       <Route exact path="/companyedit" component={CompanyEditComponent}/>
       <Route exact path="/orderadd" component={orderAddComponent}/>
       <Route exact path="/orderlist" component={orderListComponent}/>
       <Route exact path="/orderedit" component={orderEditComponent}/>
       <Route exact path="/productadd" component={productAddComponent}/>
       <Route exact path="/productlist" component={productListComponent}/>
       <Route exact path="/productedit" component={productEditComponent}/>
       <Route exact path="/statuserror" component={statusError}/>

       <Route exact component={notFound} />

     </Switch> 
   </Router>
  );
}

export default App;
