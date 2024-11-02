import React, { useEffect, useState } from "react";
import Modal from "../components/Modal";
import FetchAPI from "controllers/fetchAPI";


function ProductListModal(props) {

  const [categoryList, setCategoryList] = useState(); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await FetchAPI(process.env.SERVER_API+"/api/categories/", 'GET'); // Fetching data with GET method
        setCategoryList(data); // Set the response data to state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [props._as.reloadChild]);

  const formFields =[
    {
      "type":"text",
      "name":"name",
      "label":"Name",
      "placeholder":"Jehiro"
    },
    {
      "type":"select",
      "name":"category",
      "label":"Category",
      "placeholder":"Select a Category",
      "optionValues": categoryList?categoryList.map(obj => obj._id):[],
      "options": categoryList?categoryList.map(obj => obj.name):[]
    },
    {
      "type":"text",
      "name":"price",
      "label":"Price ($)",
      "placeholder":"2.25"
    },
    {
      "type":"text",
      "name":"quantity",
      "label":"Quantity (ml)",
      "placeholder":"800"
    },
    {
      "type":"text",
      "name":"description",
      "label":"Description",
      "placeholder":"Milk for jehiro from walmart"
    },
    {
      "type":"text",
      "name":"manufacturer",
      "label":"Manufacturer",
      "placeholder":"recibo"
    },
  ]
  return (<>
    <Modal formData = {props._as.productsData} setFormData = {props._as.setProductsData} _as = {props._as} formTitle = "Create a Product" formFields = {formFields} formAPI={process.env.SERVER_API+"/api/products/"} style="grid grid-cols-2" />
  </>);
}

export default ProductListModal;