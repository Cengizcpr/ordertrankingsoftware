import React, { Component } from 'react'
import {Link} from 'react-router-dom'

 class statusError extends Component {
  constructor(props) {
    super(props) 
  }
 
  render() { 
    return ( 
        <div>
            <div className="error-page">
                <h2 className="headline text-warning"> 404</h2>
                <div className="error-content">
                    <h3><i className="fas fa-exclamation-triangle text-warning" /> Oops! Yetki alanı dışındasınız.</h3>
                    <p>Sayın kullanıcı,<Link to='/home'>Anasayfaya </Link> bu buton üzerinden dönebilirsiniz.</p>
                </div>
            </div>
        </div>
    )
  }
}

export default statusError