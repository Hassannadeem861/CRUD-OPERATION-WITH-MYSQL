import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "./Crud.css";

function Crud() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    quantity: "",
    brand: "",
    inStock: "",
    shipping: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [products, setProducts] = useState([]);

  // GET ALL DATA API CALL
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/getallproducts"
      );
      console.log("get all products response in backend :", response.data.data);
      setProducts(response.data.data);
      // const data = response.json();
      // console.log("get all products response in backend :", data.data);
    } catch (error) {
      toast.error(error.message); // Use error.message instead of response.data.message
      console.error("Error fetching products:", error);
    }
  };

  // GET ALL DATA API
  useEffect(() => {
    fetchProducts();
  }, []);

  // POST ALL DATA API CALL
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      var response = await axios.post(
        "http://localhost:8080/api/v1/create-product",
        formData
      );
      console.log("create response in backend: ", response.data); // API se aya hua response
      // Reset form after successful submission
      setFormData({
        name: "",
        description: "",
        price: "",
        category: "",
        quantity: "",
        brand: "",
        inStock: "",
        shipping: "",
      });
      toast.success(response?.data.message); 
      fetchProducts();
    } catch (error) {
      toast.error(error.message); // Use error.message instead of response.data.message
      console.error("create error", error);
    }
  };

  // DELETE ALL DATA API CALL
  const deleteProduct = async (id) => {
    try {
      if (!id) {
        throw new Error("Invalid product ID");
      }
      var response = await axios.delete(
        `http://localhost:8080/api/v1/deletesingleproduct/${id}`
      );
      console.log("delete response in backend: ", response.data); // API se aya hua response
      fetchProducts();
      toast(response?.data?.message);
    } catch (error) {
      toast.error(error.message); // Use error.message instead of response.data.message
      console.error("delete error", error);
    }
  };

  return (
    <div className="crud">
      <h1
        style={{
          textAlign: "center",
          color: "#007bff",
          fontFamily: "Arial, sans-serif",
          fontSize: "2.5rem",
          fontWeight: "bold",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
          margin: "0.5em",
        }}
      >
        Ecommerce App
      </h1>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter name"
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description"
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price"
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Enter category"
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="text"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="Enter quantity"
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="brand">Brand:</label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            placeholder="Enter brand"
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="inStock">In Stock:</label>
          <input
            type="text"
            name="inStock"
            value={formData.inStock}
            onChange={handleChange}
            placeholder="Enter in stock"
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="shipping">Shipping:</label>
          <input
            type="number"
            name="shipping"
            value={formData.shipping}
            onChange={handleChange}
            placeholder="Enter shipping"
            required
            className="form-input"
          />
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>

      <br />
      <br />
      <br />
      <br />

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Brand</th>
            <th>In Stock</th>
            <th>Shipping</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((item) => (
            <tr key={item.id}>
              <td>{item?.id}</td>
              <td>{item?.name}</td>
              <td>{item?.description}</td>
              <td>{item?.price}</td>
              <td>{item?.category}</td>
              <td>{item?.quantity}</td>
              <td>{item?.brand}</td>
              <td>{item?.inStock}</td>
              <td>{item?.shipping}</td>
              <td>
                <button className="btn btn-danger">
                  <Link to={`/update/${item.id}`}>Edit</Link>
                </button>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteProduct(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default Crud;
