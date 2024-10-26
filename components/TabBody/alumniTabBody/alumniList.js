import React,{useState,useEffect,useMemo,useCallback,useRef} from "react"
import { AgGridReact } from 'ag-grid-react';
import { isUserSignedIn , getTokenData} from "utils/auth";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useRouter } from "next/router"
import axios from "axios";



const MyCompProfile = params => {
    return (
    <span className="flex items-center float-left" >
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 rounded-full text-[#24346D]">
                        <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
                        </svg>    {params.value}
    </span>
    );
    };

    const MyCompColor = params => {
        return (
        <span className={`${params.value == "ACTIVE"?"text-green-600":params.value =="PENDING" ? "text-yellow-500":"text-red-600"} items-center justify-center flex`} >
            {params.value}
        </span>
        );
        };
    const MyCompButton = (params) => {
        const ActionAlumniData = async (data)=>{
            if(data.accountStatus == "DELETE"){
                await axios.delete(process.env.SERVER_API+"api/alumni/", {data})
                .then((rowData) => {
                    params.setReloadChild(Math.random())
                })
            }else{
                !isUserSignedIn() ? router.push('/') : null
                const formData = new FormData();
                formData.append("document", JSON.stringify(data));
                let token = localStorage.getItem('token')
                await axios.put(process.env.SERVER_API+"api/alumni/", formData,{
                    headers: {
                    'Authorization': token
                    },
                })
                .then((rowData) => {
                    params.node.setDataValue('accountStatus', rowData.data.alumniData.accountStatus); 
                })
            }
        }
            return (<>
                        <div   className="flex items-center justify-around text-transparent">.
                           <div title="Activate" onClick={()=>ActionAlumniData({_id:params.data._id,accountStatus:"ACTIVE"})} className={`${params.value == "ACTIVE" ? "invisible" : "visible"}`}>
                                <svg className="w-6 h-6 text-green-500 hover:cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                           </div>
                            
                            <div title="Deactivate" onClick={()=>ActionAlumniData({_id:params.data._id,accountStatus:"INACTIVE"})} className={`${params.value == "INACTIVE" ? "invisible" : "visible"}`}>
                                <svg  className="w-6 h-6 text-red-500 hover:cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>

                            <div title="Edit" onClick={()=>{params.setModalToggle("/admin/alumniManagement");params.setAlumniData(params.data)}} >
                                <svg className="w-6 h-6 text-yellow-500 hover:cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                </svg>
                            </div>

                            <div title="Delete" onClick={()=>ActionAlumniData({_id:params.data._id,accountStatus:"DELETE"})}  className={`${params.value == "INACTIVE" ? "visible" : "visible"}`}>
                                <svg className="w-6 h-6 text-red-700 hover:cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>

                            </div>


                        </div>

            

            </>
            );
            };

const AlumniList = (props) => {

    const router = useRouter()

    
    const gridRef = useRef();
    const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row

     // Each Column Definition results in one Column.
    const [columnDefs, setColumnDefs] = useState([
        {headerName:'Name',field: 'name.full_name', filter: true, cellRenderer:MyCompProfile,},
        {field: 'email', filter: true},
        {field: 'phone', filter: true},
        {headerName:'Date Of Birth',field: 'date_of_birth', filter: true},
        {field: 'branch', filter: true,enableRowGroup: true},
        {headerName:'Batch Year',field: 'pass_out_year', filter: true},
        {headerName:'Company',field: 'company', filter: true},
        {headerName:'Designation',field: 'designation', filter: true},

        {headerName:'Current Location',field: 'current_address.display_name', filter: true},
        {headerName:'Permanent Location',field: 'permanent_address.display_name', filter: true},
        {headerName:'Account Status',field: 'accountStatus', filter: true, cellRenderer: MyCompColor},
        {headerName:'Action',field: 'accountStatus', filter: false, cellRenderer: MyCompButton,cellRendererParams: { setModalToggle: props.setModalToggle,setAlumniData:props.setAlumniData,setReloadChild:props.setReloadChild }},

        
    ]);
    
    const defaultColDef = useMemo(() => {
        return {
          // editable: true,
          enableRowGroup: true,
          enablePivot: true,
          enableValue: true,
          sortable: true,
          resizable: true,
          filter: true,
          flex: 0,
          minWidth: 100,
          filter: 'agTextColumnFilter',
          floatingFilter: true,
        };
      }, []);

       // Example load data from server
       
        useEffect(async () => {
            !isUserSignedIn() ? router.push('/') : null
            let token = localStorage.getItem('token')
            await axios.get(`${process.env.SERVER_API}api/alumni/admin`,{
                headers: {
                  'Authorization': token
                },
              })
            .then((rowData) => {

            rowData.data.map(item=>item.name.full_name = item.name.first_name + " " + item.name.middle_name + " "+ item.name.last_name)
            rowData.data.map(item=>item.permanent_address.display_name = item.permanent_address.permanent_street + " " + item.permanent_address.permanent_district + " "+ item.permanent_address.permanent_state+" "+item.permanent_address.permanent_country)

            setRowData(rowData.data)
            }).catch((err)=>alert(" We're sorry, but it seems your session has expired or you have been logged out. Please log in again to continue. Thank you!"))
        }, [props.reloadChild]);

        const getRowStyle = params => {
            return {
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '1rem',
              margin: '0.5rem 0',
              backgroundColor: 'rgba(249, 250, 254, 0.7)',
              
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              borderRadius: '0.5rem',
            //   cursor: 'pointer'
            };
          };

          const containerStyle = useMemo(() => ({
            width: 'auto',
            height: '450px', // Fixed height in pixels
          }), []);
          
          const gridStyle = useMemo(() => ({
            height: '70vh', // Responsive height based on viewport height
            width: 'auto',
          }), []);
    
    return (<>
                             <style >{`
                                .ag-theme-alpine {
                                    // --ag-header-height: 30px;
                                    --ag-header-foreground-color: black;
                                    --ag-header-background-color: rgba(248, 247, 252,0);
                                    // --ag-header-background-color: rgb(248, 247, 252);
                                    // --ag-header-cell-hover-background-color: rgb(248, 247, 252);
                                    // --ag-header-cell-moving-background-color: rgb(248, 247, 252);
                                  }
                                  
                                  
                                  .ag-theme-alpine {
                                        /* disable all borders */

                                        --ag-borders: none;

                                        /* then add back a border between rows */

                                        --ag-row-border-style: solid;
                                        --ag-row-border-width: 2px;

                                        // --ag-row-border-color: rgb(150, 150, 200);
                                        --ag-row-border-color: rgb(240, 189, 102);
                                    }
                                    .ag-theme-alpine {
                                        // --ag-foreground-color: rgb(126, 46, 132);
                                        --ag-background-color: rgba(248, 247, 252, 0.5);
                                        // --ag-header-foreground-color: rgb(204, 245, 172);
                                        // --ag-header-background-color: rgb(209, 64, 129);
                                        // --ag-odd-row-background-color:  rgba(248, 247, 252, 0.5);
                                        // --ag-header-column-resize-handle-color: rgb(126, 46, 132);
                                      
                                        // --ag-font-size: 17px;
                                        // --ag-font-family: monospace;
                                      }

                                      .ag-theme-alpine {
                                        --ag-borders-input: solid 2px;
                                        --ag-input-border-color: rgb(240, 189, 102);
                                        // --ag-input-border-color: rgb(240, 189, 102);
                                        // --ag-input-border-color: rgb(240, 189, 102);
                                    }
                                  
                                  `}
                             </style>
                             
                              <div style={containerStyle} className="my-8  ">
                                    <div  className="ag-theme-alpine 2xl:h-[80vh] md:h-[70vh]  ">
                                        
                                        <AgGridReact
                                            className="w-full h-full "
                                            ref={gridRef}

                                            getRowStyle={getRowStyle}

                                            defaultColDef={defaultColDef}
                                            rowData={rowData}
                                            columnDefs={columnDefs}
                                            pagination={true}
                                            // rowSelection={'single'}
                                            // onSelectionChanged={onSelectionChanged}

                                            >
                                              
                                              
                                        </AgGridReact>
                                    </div>
                              </div>
    </>)
}

export default AlumniList