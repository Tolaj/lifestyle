import React,{useState,useEffect,useMemo,useCallback,useRef} from "react"
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import axios from "axios";
import FetchAPI from "controllers/fetchAPI";
import { useRouter } from "next/router";
import PageChange from "components/PreLoader";
import { func } from "prop-types";

const ActionsComponent = (params) => {

    const handleAction = async (method,data) => {
        try {
            const response = await FetchAPI(params.gridApi, method, data);
        //   console.log("Action successful:", response);
            params.setPreLoader(false)
            params._as.setReloadChild(Math.random())
        } catch (error) {
            console.error("Error deleting data:", error);
        }
    };
    return (<>
                    <div   className="flex items-center justify-center text-transparent gap-4">.
                      
                        <div title="Edit" onClick={()=>{params._as.setModalToggle(params.router);params._as.setCategoryData(params.data)}} >
                          
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-black hover:cursor-pointer" >
                              <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                              <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                            </svg>

                        </div>
                        
                        <div title="Delete" onClick={()=>{params.setPreLoader(true);handleAction("DELETE",params.data)}}  className={`flex items-center justify-center gap-2 hover:cursor-pointer text-black font-semibold`}>
                            
                            <svg className="w-6 h-6 text-black hover:cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" >
                              <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" />
                            </svg>

                        </div>
  
                    </div>
        </>);
  };

const GridBody = (props) => {
    
    const gridRef = useRef();
    const router = useRouter()
    const [rowData, setRowData] = useState(); 
    const [preLoader, setPreLoader] = React.useState(0);
    const [columnDefs, setColumnDefs] = useState(
        [
            ...props.columns.map((column,index) => {
              return { headerName: column, field: column, filter: true, cellRenderer: props.columnComponents?(typeof(props.columnComponents[index]) != 'function') ? (params)=>{ return params.data[column]}:props.columnComponents[index]:(params)=>{ return params.data[column]} };
            }),
            {
                headerName: 'Action',
                field: 'action',
                filter: false,
                cellRenderer: ActionsComponent,
                cellRendererParams: { router:router.route, _as: props._as, gridApi: props.gridApi, preLoader:preLoader, setPreLoader:setPreLoader }
              }
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
       
       useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await FetchAPI(props.gridApi, 'GET'); // Fetching data with GET method
            setRowData(data); // Set the response data to state
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
      }, [props._as.reloadChild]);


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
          
          // const gridStyle = useMemo(() => ({
          //   height: '70vh', // Responsive height based on viewport height
          //   width: 'auto',
          // }), []);
    
    return (<>
    <div className="flex flex-wrap relative items-center z-0 justify-center ">
    <img src="/img/display.png" className="absolute top-0 blur-sm z-0 w-2/4" alt="" />
    {preLoader? <PageChange />:<></>}
                <div className="h-full w-full  z-20 top-0 ">
                             <style >{`
                                .ag-theme-alpine {
                                    // --ag-header-height: 10px;
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
                                        --ag-row-border-color: black;
                                        // --ag-row-border-color: rgb(240, 189, 102);
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
                                        --ag-input-border-color: black;
                                        // --ag-input-border-color: rgb(240, 189, 102);
                                    }
                                  
                                  `}
                             </style>
                             
                              <div style={containerStyle} className="my-8 -mt-4 ">
                                    <div  className="ag-theme-alpine 2xl:h-[80vh] md:h-[70vh] h-[75vh] ">
                                        
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
                              </div>
    
                              </div>
    </>)
}

export default GridBody;