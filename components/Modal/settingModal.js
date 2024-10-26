import React, { useEffect, useState } from "react"
import URL from "constants"
import axios from "axios"
import PageChange from "../PreLoader"

export default function Modal(props) {
  const [showModal, setShowModal] = React.useState(true)
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [tempGalleryData, setTempGalleryData] = useState({
    fileUrl:"",
    type:"",
  })


  const handleChange = (e) => {
    const { name, value } = e.target;
      
    setTempGalleryData((prevState) => ({
          ...prevState,
          [name]: value,
      }));
      

      const file = e.target.files?e.target.files[0]:null; // Get the first selected file

      if (file) {
        setTempGalleryData((prevState) => ({
          ...prevState,
          image: file,
        }));
      }
  }

  const postGalleryItem = async() => {
    
    const formData = new FormData()
    formData.append("image", tempGalleryData.image)
    formData.append("document", JSON.stringify(tempGalleryData));
    const config = {
      onUploadProgress: (progressEvent) => {
        const progress = Math.round(
          (progressEvent.loaded / progressEvent.total) * 100
        );
        setUploadProgress(progress);
      },
    };
    try {
       axios.post(`${process.env.SERVER_API}api/gallery`, formData, config)
       .then(async (result)=>{
  
          props._as.setModalToggle("")
          setLoading(false);
          props._as.setReloadChild(Math.random())
    })
    } catch (error) {
      // File upload failed
      console.log('Upload failed!');
      setLoading(false);
      console.log(error);
    }
  }

  const departmentsList = [
    {
      Branch: "Biotechnology Engineering",
    },
    {
      Branch: "Civil Engineering",
    },
    {
      Branch: "Computer Science & Engineering",
    },
    {
      Branch: "Electronics & Telecommunication",
    },
    {
      Branch: "Electronics Engineering",
    },
    {
      Branch: "Environmental Engineering",
    },
    {
      Branch: "Information Technology",
    },
    {
      Branch: "Mechanical Engineering",
    },
    {
      Branch: "Production Engineering",
    },
  ]

  return (
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      {loading? <PageChange progress={uploadProgress}/>:
      <div className="relative w-auto my-6 mx-auto max-w-3xl">
      {/*content*/}
      <form onSubmit={() => {postGalleryItem(),setLoading(true)}}>
      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
        {/*header*/}
        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
          <h3 className="text-3xl font-semibold">Upload an image</h3>
          <button
            className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
            onClick={() => setShowModal(false)}
          >
            <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
              ×
            </span>
          </button>
        </div>
        {/*body*/}
        <div className="relative p-6 flex-auto">
          <div className="flex gap-6">
                        <div className="w-full">
                          <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email Address </label>
                          <input onChange={handleChange} name="specialization" type="email" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=" " required />
                        </div>
                        <div className="w-full">
                          <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password </label>
                          <input onChange={handleChange} name="specialization" type="password" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=" " required />
                        </div>
          </div>
        </div>
        {/*footer*/}
        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
          <button
            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="submit"
            onClick={() => props._as.setModalToggle("")}
          >
            Close
          </button>
          <button
            className="bg-[#F0BD66] text-white active:bg-[#F0BD66] font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="submit"
       
          >
            Save Changes
          </button>
        </div>
      </div>
      </form>
    </div>
      }
    </div>
  )
}
