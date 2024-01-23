/** @format */

import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
function App() {
  const [products, setProducts] = useState([]);
  const fetchProduct = async () => {
    const { value } = document.getElementById("inputSearch");
    const res = await axios.get("http://localhost:8000/products", {
      params: {
        productName: value,
      },
    });
    setProducts(res.data.data);
  };
  useEffect(() => {
    fetchProduct();
  }, []);
  return (
    <div>
      <input type="text" placeholder="search product" id="inputSearch"></input>
      <button onClick={fetchProduct}>search</button>
      <table>
        <thead>
          {/* id,name,stock,desc */}
          <tr>
            <th>id</th>
            <th>name</th>
            <th>stock</th>
            <th>desc</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, key) => (
            <tr key={key}>
              <td>{product.id}</td>
              <td>{product.productName}</td>
              <td>{product.stock}</td>
              <td>{product.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
