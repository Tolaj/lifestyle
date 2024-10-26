import React from "react";
import axios from "axios";
import { isUserSignedIn } from "utils/auth";
import { useRouter } from 'next/router'

import PageChange from "components/PreLoader";
import FormInputFields from "components/InputFields";

function ProductListModal(props) {

    const router = useRouter()
    const [uploadProgress, setUploadProgress] = React.useState(0);
    const [preLoader, setPreLoader] = React.useState(0);
    const [tempData, setTempData] = React.useState({})

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
        const formData = new FormData()
        formData.append("file", tempData.file)
        formData.append("document", JSON.stringify(tempData));
        const config = {
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            setUploadProgress(progress);
          },
        };
        try {
           await axios.post(`---------Save api Here---------`, formData, config)
           .then(async (result)=>{
      
              props._as.setModalToggle("")
              setPreLoader(false);
              props._as.setReloadChild(Math.random())
    
        })
        } catch (error) {
          console.log('_____Upload failed!_____');
          setPreLoader(false);
          console.log(error);
        }
    };

    const handleUpdate = async ()=>{
        setPreLoader(1)
        const formData = new FormData();
        let tempDataObj = tempData
        formData.append("document", JSON.stringify(tempDataObj));
        let token = localStorage.getItem('token')
        try {
            await axios.put(process.env.SERVER_API+"api/alumni/", formData)
            .then((rowData) => {
                props._as.setModalToggle("")
                setPreLoader(false);
                props._as.setReloadChild(Math.random())
    
            })
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
                  <div className="md:min-w-[600px] bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Create a Product
                      </h1>
                      <form className="flex flex-col gap-4 md:gap-6 " method="POST" onSubmit={(e)=>{e.preventDefault(); }}>  
                        
                         <div className="gap-4 md:gap-6 grid grid-cols-2">
                          <FormInputFields.Text name="name" />
                          <FormInputFields.Text name="category" label="Category" placeholder="Dairy" />
                          <FormInputFields.Text name="price" label="Price ($)" placeholder="2.25" />
                          <FormInputFields.Text name="quantity" label="Quantity (ml)" placeholder="700" />
                          <FormInputFields.Text name="description" label="Description" placeholder="Milk for jehiro from walmart" />
                          <FormInputFields.Text name="Manufacturer" label="Manufacturer" placeholder="Recibo" />
                          <FormInputFields.Button label="Cancel" onClick={()=>{props._as.setModalToggle("")}} styleBg="bg-black hover:bg-gray-700 focus:ring-white-300" />
                          <FormInputFields.Button label="Save" styleBg="bg-black hover:bg-gray-700 focus:ring-black"  />
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

export default ProductListModal;