import PageChange from "components/PreLoader";
import React from "react";
import axios from "axios";
import { isUserSignedIn } from "utils/auth";
import { useRouter } from 'next/router'

export default function Modal(props) {
  const [showModal, setShowModal] = React.useState(true);

  const router = useRouter()
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const [preLoader, setPreLoader] = React.useState(0);
  const [tempActivityData,setTempActivityData] = React.useState({
    images:"",
    title:"",
    body:"",
    date:"",
    guestName:"",
    link:""
  });

  React.useEffect(()=>{
    console.log("props._as.alumniData : ",props._as.alumniData)
    props._as.alumniData ? setTempActivityData(props._as.alumniData) : null
  },[])

  const handleChange = (e) => {
      const { name, value } = e.target;
      
      setTempActivityData((prevState) => ({
          ...prevState,
          [name]: value,
      }));
      

      const file = e.target.files?e.target.files[0]:null; // Get the first selected file

      if (file) {
        setTempActivityData((prevState) => ({
          ...prevState,
          image: file,
        }));
      }
  }

  const handleSave = async () => {
    !isUserSignedIn() ? router.push('/') : null
    const formData = new FormData();
    let activityData = tempActivityData
    formData.append('image', activityData.image);
    formData.append("document", JSON.stringify(activityData));
    let token = localStorage.getItem('token')
    setPreLoader(1)
    try {
     
      await axios.post(process.env.SERVER_API+"api/alumni/activity", formData,{
        headers: {
          'Authorization': token
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          );
          setUploadProgress(progress);
        },
      })
      .then((response) => {
        setPreLoader(0)
        props._as.setAlumniData(null)
        props._as.setModalToggle("")
      })
      .catch((error) => {
        // Callback function for error
        console.error('Post request error:', error);
        // Perform any error handling or display error messages
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async ()=>{
    setPreLoader(1)
    !isUserSignedIn() ? router.push('/') : null
    const formData = new FormData();
    let activityData = tempActivityData
    formData.append('image', activityData.image);
    formData.append("document", JSON.stringify(activityData));
    let token = localStorage.getItem('token')
    await axios.put(process.env.SERVER_API+"api/alumni/activity", formData,{
        headers: {
          'Authorization': token
        },
      })
    .then((rowData) => {
      console.log("update------------",rowData)
      setPreLoader(0)
      props._as.setAlumniData(null)
      props._as.setModalToggle("")
      props._as.setReloadChild(Math.random())
    })
}

  return (
   
      
     
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            {preLoader? <PageChange progress={uploadProgress} />:
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <form action="#" onSubmit={(e) => {e.preventDefault(); props._as.alumniData ? handleUpdate() : handleSave()}}>
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Create alumni activity
                  </h3>
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
                <div className="relative p-6 gap-y-4 flex flex-col">
                
                    <div className="flex gap-6">
                      
                        <div>
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload Broacher / Poster</label>
                          <input name="image" onChange={handleChange}   className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" />
                        </div>
                        <div>
                          <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Activity Title</label>
                          <input type="text"   id="title" name="title"  onChange={handleChange} value={tempActivityData.title} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=" " required />
                        </div>
                        <div>
                          <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Activity Date</label>
                          <input type="date"  id="date" name="date"  onChange={handleChange} value={tempActivityData.date} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="02/06/2000" required/>
                        </div>
                     </div>


                     <div className="flex flex-col mt-2">
                      

                      <label for="body" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Activity Description</label>
                      <textarea id="body" name="body" onChange={handleChange}  value={tempActivityData.body} rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>

                   </div>
                        <div className="flex gap-x-6">
                          <div>
                            <label for="guestName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Alumni / Guest Name</label>
                            <input type="text" id="guestName" name="guestName" onChange={handleChange} value={tempActivityData.guestName}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=" " required />
                          </div>
                          <div className="w-[65%]">
                            <label for="link" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Link &#128279;</label>
                            <input type="text" id="link" name="link" onChange={handleChange} value={tempActivityData.link} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=" " required />
                          </div>
                        
                        </div>


                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {props._as.setModalToggle("");props._as.setAlumniData(null)}}
                  >
                    Close
                  </button>
                  <button
                    className="bg-[#F0BD66] text-white active:bg-[#F0BD66] font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                  >
                    {props._as.alumniData ? "Update Changes" :"Save Changes"}
                  </button>
                </div>
              </div>
              </form>
            </div>
            }
          </div>
         
    
  );
}