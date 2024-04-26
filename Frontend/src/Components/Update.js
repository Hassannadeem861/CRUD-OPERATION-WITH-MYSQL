import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./update.css";
import { useParams, useNavigate } from "react-router-dom";

const ProductUpdateFunction = () => {
  const [hassan, setHassan] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    quantity: "",
    brand: "",
    inStock: "",
    shipping: "",
  });
  console.log("state local variable :", hassan);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setHassan((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const params = useParams();
  console.log("params single product response id in backend: ", params);


  const getSingleProductData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/getsingleproduct/${params.id}`
      );
      console.log("get single data response in backend: ", response?.data);
      setHassan(response?.data?.data);
    } catch (error) {
      console.error("GET SINGLE DATA", error);
    }
  };

  useEffect(() => {
    getSingleProductData();
  }, [params.id]);

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (!params.id) {
        throw new Error("Invalid product ID");
      }
      var updateResponse = await axios.put(
        `http://localhost:8080/api/v1/updatesingleproduct/${params.id}`,
        hassan
      );
      console.log(
        "update single product in backend updateResponse :",
        updateResponse
      );
      if (updateResponse.status === 200) {
        toast.success(updateResponse.data.message); // Assuming you have a toast.success method
        navigate("/"); // Navigate to home page upon successful update
      } else {
        toast.error("Failed to update product");
      }
    } catch (error) {
      toast.error(error.message);
      console.error("update error :", error);
    }
  };

  return (
    <>
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
        Update Product
      </h1>
      <form onSubmit={submitHandler} className="form-container">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            value={hassan?.name}
            onChange={inputHandler}
            placeholder="Enter name"
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            name="description"
            value={hassan?.description}
            onChange={inputHandler}
            placeholder="Enter description"
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="text"
            name="price"
            value={hassan?.price}
            onChange={inputHandler}
            placeholder="Enter price"
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            name="category"
            value={hassan?.category}
            onChange={inputHandler}
            placeholder="Enter category"
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="text"
            name="quantity"
            value={hassan?.quantity}
            onChange={inputHandler}
            placeholder="Enter quantity"
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="brand">Brand:</label>
          <input
            type="text"
            name="brand"
            value={hassan?.brand}
            onChange={inputHandler}
            placeholder="Enter brand"
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="inStock">In Stock:</label>
          <input
            type="text"
            name="inStock"
            value={hassan?.inStock}
            onChange={inputHandler}
            placeholder="Enter in stock"
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="shipping">Shipping:</label>
          <input
            type="number"
            name="shipping"
            value={hassan?.shipping}
            onChange={inputHandler}
            placeholder="Enter shipping"
            className="form-input"
          />
        </div>
        <button type="submit" className="submit-button">
          Update
        </button>
      </form>
      <br />
      <br />
      <br />
    </>
  );
};

export default ProductUpdateFunction;
