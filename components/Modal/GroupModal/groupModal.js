import React, { useEffect, useState } from "react";
import Modal from "../components/Modal";
import HeroIcon, { heroIcons, heroIconsNames }  from 'utils/heroIcon';
import Colors from "utils/colors";
import { useRouter } from "next/router";

function GroupModal(props) {

  const [groups,setGroups] = useState(props?._as?.user?.groups)
  const [activeGroups,setActiveGroups] = useState(localStorage.getItem('activeGroup'))
  const router = useRouter()
    return (<>
              <div className="justify-center items-center bg-black bg-opacity-50 flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto mx-auto max-w-4xl">
 

                  <section className="flex relative flex-col items-center pt-6 bg-white p-4 rounded-xl "> 
                    
                  <svg  onClick={()=>{props._as.setModalToggle("")}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5 absolute top-2 right-2 hover:cursor-pointer hover:bg-gray-200 rounded-xl ">
                    <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                  </svg>

                 
                    <h3 class="mb-4 font-semibold text-gray-900 dark:text-white">Select a Group</h3>

                    <ul class="w-48 overflow-y-scroll max-h-[400px] text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                      {groups.map((group, index) => (
                        <li key={group._id} className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                          <div className="flex items-center ps-3">
                            <input
                              checked={group._id === activeGroups}
                              onClick={(e) => {
                                setActiveGroups(e.target.value);
                                localStorage.setItem('activeGroup', e.target.value);
                                router.reload();
                              }}
                              id={`list-radio-license-${group._id}`}
                              type="radio"
                              value={group._id}
                              name="list-radio"
                              className="w-4 h-4 text-black bg-gray-100 border-gray-300 focus:ring-black focus:ring-2"
                            />
                            <label htmlFor={`list-radio-license-${group._id}`} className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                              {group.name === "ISOLATED_GROUP" ? "Just you" : group.name}
                            </label>
                          </div>
                        </li>
                      ))}
                    </ul>




                  </section>
                </div>
              </div>
          </>)
}

export default GroupModal;