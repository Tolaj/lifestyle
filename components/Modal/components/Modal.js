import React, { useEffect } from "react";
import axios from "axios";
import { isUserSignedIn } from "utils/auth";
import { useRouter } from 'next/router'

import PageChange from "components/PreLoader";
import FormInputFields from "components/InputFields";
import FetchAPI from "controllers/fetchAPI";

function Modal(props) {

    const router = useRouter()
    const [uploadProgress, setUploadProgress] = React.useState(0);
    const [preLoader, setPreLoader] = React.useState(0);
    const [tempData, setTempData] = React.useState({});

    useEffect(()=>{
      props.formData ? setTempData(props.formData) : null
    },[])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTempData((prevState) => ({
              ...prevState,
              [name]: value,
          }));
          

    
        const file = e.target.files?e.target.files[0]:null;
    
        if (file) {
            setTempData((prevState) => ({
              ...prevState,
              file: file,
            }));
        }
    }

    const handleSave = async () => {
      setPreLoader(true);
      const config = {
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          setUploadProgress(progress);
        },
        // Additional config options can be added here if needed
      };
    
      let additionalData = tempData;

        if(props.additionalData){
          additionalData = {
              ...tempData,
              ...props.additionalData 
            }
        }

      try {
        const result = await FetchAPI(props.formAPI, 'POST', additionalData, config);
        
        props._as.setModalToggle(""); // Close the modal
        props.setFormData("")
        setPreLoader(false); // Stop the preloader
        props._as.setReloadChild(Math.random()); // Trigger reload
    
      } catch (error) {
        console.log('_____Upload failed!_____');
        setPreLoader(false);
        console.log(error);
      }
    };


    const handleUpdate = async ()=>{
      setPreLoader(true);
    
      const config = {
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          setUploadProgress(progress);
        },
        // Additional config options can be added here if needed
      };
    
      try {

        let additionalData = tempData;

        if(props.additionalData){
          additionalData = {
              ...tempData,
              ...props.additionalData 
            }
        }

        const result = await FetchAPI(props.formAPI, 'PUT', additionalData, config);
        
        props._as.setModalToggle(""); // Close the modal
        props.setFormData("")
        setPreLoader(false); // Stop the preloader
        props._as.setReloadChild(Math.random()); // Trigger reload
    
      } catch (error) {
        console.log('_____Upload failed!_____');
        setPreLoader(false);
        console.log(error);
      }
    }

    return (<>
        <div className="justify-center items-center bg-black bg-opacity-50 flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          {preLoader? <PageChange />:
              <div className="relative w-auto mx-auto max-w-4xl">

                <section className="flex flex-col items-center pt-6  ">
                  <div className="min-w-[350px] md:min-w-[400px] bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        {props.formTitle}
                      </h1>
                      <form className="flex flex-col gap-4 md:gap-6 " onSubmit={(e)=>{e.preventDefault(); props.formData ? handleUpdate() : handleSave() }}>  
                        <div className={`gap-4 md:gap-6 ${props.style?props.style:"grid grid-cols-1"} `}>
                          {props.formFields.map((formField,index)=>{
                            switch (formField.type) {
                              case 'text':
                                return(<><FormInputFields.Text name={formField.name} onChange={handleChange} value={tempData[formField.name]} label={formField.label} placeholder={formField.placeholder} style={formField.style} /></>)
                              case 'email':
                                return(<><FormInputFields.Email name={formField.name} onChange={handleChange} value={tempData[formField.name]} label={formField.label} placeholder={formField.placeholder} /></>)
                              case 'password':
                                return(<><FormInputFields.Password name={formField.name} onChange={handleChange} value={tempData[formField.name]} label={formField.label} placeholder={formField.placeholder} /></>)  
                              case 'select':
                                return(<><FormInputFields.Select name={formField.name} onChange={handleChange} value={tempData[formField.name]} label={formField.label} options = {formField.options} optionValues = {formField.optionValues} placeholder={formField.placeholder} /></>)
                              case 'customSelect':
                                return(<><FormInputFields.GridSelect name={formField.name} onClick={handleChange} value={tempData[formField.name]} label={formField.label} options = {formField.options} optionValues = {formField.optionValues} placeholder={formField.placeholder} /></>)
                              case 'checkBoxSelect':
                                return(<><FormInputFields.CheckBoxSelect name={formField.name} onClick={handleChange} value={tempData[formField.name]} label={formField.label} options = {formField.options} optionValues = {formField.optionValues} placeholder={formField.placeholder} /></>)
                              default:
                                return(<>No Form Field</>)                               
                            }                          
                          })}
                          <FormInputFields.Button label={props.formData ? "Update Changes" :"Save Changes"} styleBg="bg-black hover:bg-gray-700 focus:ring-black"  />
                          <FormInputFields.Button label="Cancel" onClick={()=>{props._as.setModalToggle(""); props.setFormData("") }} styleBg="bg-black hover:bg-gray-700 focus:ring-white-300" />
                        </div>
                        <div className=" flex items-center justify-center">
                          <FormInputFields.NoticeTag />
                        </div>

                      </form>
                    </div>
                  </div>
                </section>

              </div>
          }
      </div>
    </>);
}

export default Modal;