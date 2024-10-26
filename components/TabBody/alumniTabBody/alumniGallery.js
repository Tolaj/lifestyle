import React,{useState,useEffect,useMemo,useCallback,useRef} from "react"
import { AgGridReact } from 'ag-grid-react';
import { isUserSignedIn , getTokenData} from "utils/auth";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useRouter } from "next/router"
import axios from "axios";



    const MyCompButton = (params) => {
        const ActionAlumniData = async (data)=>{
            await axios.post(process.env.SERVER_API+"api/gallery", {data})
            .then((rowData) => {
              params.setReloadChild(Math.random())
            })
      
    }
            return (<>
                        <div   className="flex items-center justify-center text-transparent">.
                        <div title="Delete" onClick={()=>ActionAlumniData({_id:params.data._id,accountStatus:"DELETE"})}  className={`flex items-center justify-center gap-2 hover:cursor-pointer text-red-700 font-semibold`}>
                                <svg className="w-6 h-6 text-red-700 hover:cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>Delete

                            </div>


                        </div>

            

            </>
            );
            };

            const MyCompProfile = params => {
                return (
                <a  href={params.value} className="flex items-center justify-start gap-2" >
                     <img src={params.value} className="w-10 h-10" alt="" /> {params.value}
                </a>
                );
                };

const AlumniGallery = (props) => {

    const router = useRouter()

    
    const gridRef = useRef();
    const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row

     // Each Column Definition results in one Column.
     const [columnDefs, setColumnDefs] = useState([
        {headerName:'File ',field: 'fileUrl', filter: true, cellRenderer:MyCompProfile},
        {headerName:'Type',field: 'type', filter: true},
        {headerName:'Date',field: 'createdAt', filter: true},
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
          flex: 1,
          minWidth: 100,
          filter: 'agTextColumnFilter',
          floatingFilter: true,
        };
      }, []);

       // Example load data from server
       
        useEffect(async () => {
            !isUserSignedIn() ? router.push('/') : null
            let token = localStorage.getItem('token')
            await axios.get(`${process.env.SERVER_API}api/gallery`,{
                headers: {
                  'Authorization': token
                },
              })
            .then((rowData) => {
            const filteredObjects = rowData.data.filter(obj => obj.type === "Alumni");
            setRowData(filteredObjects)
            })
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

export default AlumniGallery