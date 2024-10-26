import React,{useState,useEffect} from "react";
import dynamic from 'next/dynamic'
import PageChange from "../PreLoader"
import axios from "axios";
import { isUserSignedIn } from "utils/auth";
import { useRouter } from 'next/router'

const SelectLocation = dynamic(() => import('../Map/selectLocation'), {
  ssr: false,
})

export default function Modal(props) {
  const router = useRouter()

  const [showModal, setShowModal] = React.useState(true);
  const [showMap, setShowMap] = React.useState(0);
  const [passwordMatch, setPasswordMatch] = React.useState(null);
  const [location, setLocation] = React.useState({
    display_name:"",
    address:"",
    lat:0,
    log:0,
  });

  const center = {
    lat: 51.505,
    lng: -0.09,
  }
  const [position, setPosition] = React.useState(center)

  const [preLoader, setPreLoader] = React.useState(0);

  const [tempProfileData,setTempProfileData] = useState({
    photoUrl:"",
    name:{
    first_name: "",
    middle_name: "",
    last_name: "",
    },
    date_of_birth: "",
    phone:"",
    pass_out_year: "",
    branch: "",
    company: "",
    designation: "",
    email: "",
    password: "ChangeMe",
    confirm_password: "",
    permanent_address:{
    permanent_street : "",
    permanent_district: "",
    permanent_state: "",
    permanent_country: "",
    },
    current_address : {
        display_name:"",
        address:"",
        lat:0,
        lon:0,
    },
    accountStatus:"ACTIVE"
  });

  useEffect(()=>{
    setTempProfileData((prevState) => ({
        ...prevState,
        ["current_address"]: {
          ...prevState["current_address"],
          ["display_name"]: location.display_name,
          ["address"]: location.address,
          ["lat"]: location.lat,
          ["lon"]: location.lon,
        },
      }));
  },[location])

  useEffect(()=>{
    props._as.alumniData ? setTempProfileData(props._as.alumniData) : null
  },[])

  const handleChange = (e) => {
    const { name, value } = e.target;
      
    if (name.includes('.')) {
        const [parentKey, childKey] = name.split('.');
        setTempProfileData((prevState) => ({
          ...prevState,
          [parentKey]: {
            ...prevState[parentKey],
            [childKey]: value,
          },
        }));
      } else {
        // if(name=="password" || name== "confirm_password"){
        //   tempProfileData.password == value || tempProfileData.confirm_password == value ? setPasswordMatch(1):setPasswordMatch(0) 
        // }
        setTempProfileData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      }

      const file = e.target.files?e.target.files[0]:null; // Get the first selected file

      if (file) {
      const fileLocation = URL.createObjectURL(file);
      console.log('File location:', fileLocation);

      setTempProfileData((prevState) => ({
        ...prevState,
        photoUrl: fileLocation,
      }));
      }
  }

  const handleSave = async () => {
    const alumniAddUrl = `${process.env.SERVER_API}api/alumni/`
    setPreLoader(1)
    try {
      const res = await axios.post(alumniAddUrl, tempProfileData)
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
    let profileData = tempProfileData
    profileData.password.length > 20 ? delete profileData.password : null
    formData.append("document", JSON.stringify(profileData));
    let token = localStorage.getItem('token')
    await axios.put(process.env.SERVER_API+"api/alumni/", formData,{
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
            {preLoader? <PageChange />:
            <div className="relative w-auto mx-auto max-w-4xl">
              {/*content*/}
              <form action="#"  onSubmit={(e) => {e.preventDefault(); props._as.alumniData ? handleUpdate() : handleSave()}}>
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Register a alumni
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
                { showMap ? <SelectLocation position={position} setPosition={setPosition} setShowMap={setShowMap} setLocation={setLocation} />:

                <>
                  <div className="grid gap-2  grid-cols-4 px-3 pt-3">
                             
                            <div>
                                <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
                                <input type="text" id="first_name"name="name.first_name" onChange={handleChange}  value={tempProfileData.name.first_name} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required/>
                            </div>
                            <div>
                                <label htmlFor="middle_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Middle name</label>
                                <input type="text" id="middle_name" name="name.middle_name" onChange={handleChange}  value={tempProfileData.name.middle_name}className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Max" required/>
                            </div>
                            <div>
                                <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name</label>
                                <input type="text" id="last_name" name="name.last_name" onChange={handleChange}  value={tempProfileData.name.last_name} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" required/>
                            </div>
                            <div>
                                <label htmlFor="date_of_birth" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date Of Birth</label>
                                <input type="date" id="date_of_birth" name="date_of_birth" onChange={handleChange}  value={tempProfileData.date_of_birth} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="02/06/2000" required/>
                            </div>    
                            <div>
                                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
                                <input type="number" id="phone" name="phone" onChange={handleChange} value={tempProfileData.phone} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required/>
                            </div>
                            <div>
                                <label htmlFor="pass_out_year" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pass out Year</label>
                                <input type="number" id="pass_out_year" name="pass_out_year" onChange={handleChange} value={tempProfileData.pass_out_year} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="2019" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required/>
                            </div>   
                            <div >
                                    <label htmlFor="branch" className="text-base font-medium text-gray-900"> Branch </label>
                                    <select id="branch" required name="branch"  onChange={handleChange}  value={tempProfileData.branch}  autoComplete="branch-name" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                      <option>Biotechnology Engineering</option>
                                      <option>Civil Engineering</option>
                                      <option>Computer Sci. & Engineering</option>
                                      <option>Computer Science & Business Systems</option>
                                      <option>Computer Sci. & Engg. [Data Science]</option>
                                      <option>Computer Sci. & Engg. [AI & ML]</option>
                                      <option>Electrical Engineering</option>
                                      <option>Electronics & Telecomm Engineering</option>
                                      <option>Civil & Environmental Engineering</option>
                                      <option>Mechanical Engineering</option>
                                    </select>
                            </div>     
                            <div>
                                <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Current organisation</label>
                                <input type="text" id="company" name="company" onChange={handleChange} value={tempProfileData.company} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Hashinclude Org" required/>
                            </div>  
                            
                            <div>
                                <label htmlFor="designation" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Designation</label>
                                <input type="text" id="designation" name="designation" onChange={handleChange} value={tempProfileData.designation} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Software Engineer" required/>
                            </div>
                            <div className="mb-2">
                              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
                              <input type="email" id="email" name="email" onChange={handleChange} value={tempProfileData.email} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" required/>
                            </div> 
                            <div className="mb-2">
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                
                                <input type="text"  id="password"  name="password" onChange={handleChange} value={tempProfileData.password} className={` border-gray-300 text-gray-900   bg-gray-50 border-2  text-sm rounded-lg  block w-full p-2.5  `} placeholder="•••••••••" required/>
                            </div> 
                            <div >
                                    <label htmlFor="branch" className="text-base font-medium text-gray-900"> Account Status </label>
                                    <select id="branch" required name="accountStatus"  onChange={handleChange}  value={tempProfileData.accountStatus}  autoComplete="branch-name" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                      <option>ACTIVE</option>
                                      <option>PENDING</option>
                                      <option>INACTIVE</option>
                                    
                                    </select>
                            </div> 
                        
                  </div>
                  <div className="mb-2 px-3">
                            <label htmlFor="permanent" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Permanent address</label>
                          <div className="grid gap-2 mb-2 grid-cols-4 ">
                          <input type="text" id="permanent_street" name="permanent_address.permanent_street" onChange={handleChange} value={tempProfileData.permanent_address.permanent_street}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Street / House No."  required/>
                            <input type="text" id="permanent_district"  name="permanent_address.permanent_district" onChange={handleChange} value={tempProfileData.permanent_address.permanent_district} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="District" required/>
                            <input type="text" id="permanent_state" name="permanent_address.permanent_state" onChange={handleChange} value={tempProfileData.permanent_address.permanent_state}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="State" required/>
                            <input type="text" id="permanent_country" name="permanent_address.permanent_country" onChange={handleChange} value={tempProfileData.permanent_address.permanent_country}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Country" required/>

                  </div>
                  </div> 
                  <div className="mb-2 px-3 pb-3">
                            <label htmlFor="current_address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Current address</label>
                            <input type="text" id="current_address"  onClick={()=>{setShowMap(1)}} name="current_address"  value={tempProfileData.current_address.display_name}  className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select Location On Map"  required/>
                  </div> 
                </>
                }
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      props._as.setModalToggle("");
                      props._as.setAlumniData(null)
                      

                    }}
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