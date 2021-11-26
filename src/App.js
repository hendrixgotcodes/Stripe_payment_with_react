import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import StripeCheckout from 'react-stripe-checkout';

function App() {

  const [product, setProduct] = useState({
    name: "React from FB",
    price: 10,
    productBy: "facebook"
  })

  const makePayment = token=>{

    const body = {
      token,
      product
    }

    const headers={
      "Content-Type": "application/json"
    }

    return fetch(`http://localhost:9292`,{
      method: "POST",
      headers,
      body: JSON.stringfy(body)
    }).then((response)=>{

      console.log("RESPONSE", response);
      console.log("STATUS", response.status);

    }).catch((err)=>{
      console.log(err);
    })
      
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <StripeCheckout 
          stripeKey={process.env.REACT_APP_KEY}
          token={{makePayment}}
          name='Buy React'
          amount={product.price*100}
        >
          <butto className="btn-large blue" n>Checkout with card GHc {product.price} </butto>
        </StripeCheckout>
      </header>
    </div>
  );
}

export default App;
