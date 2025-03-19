import InputFields from 'components/InputFields';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

function Tabs({ children, ...props }) {
    const router = useRouter();
    const currentChild = Array.isArray(children)
        ? children.find(item => item.props._acTab.route === router.route) || "No Tab For This Route"
        : children.props._acTab.route === router.route
        ? children
        : "No Tab For This Route";

    return currentChild;
}

const Tab = ({ _acTab, _as }) => {
    const [windowWidth, setWindowWidth] = useState(null);
    const router = useRouter();

    useEffect(() => {
        setWindowWidth(window.outerWidth);
    }, []);

    const renderTabSections = () => (
        <ul className={`mt-6 ${_acTab.tabSections.length > 1 ? "border-b" : ""} flex flex-wrap text-sm font-medium text-center text-gray-500 border-gray-200 dark:border-gray-700 dark:text-gray-400`}>
            {_acTab.tabSections.map((section, index) => (
                <li key={index} className="mr-2" onClick={() => _acTab.setActiveTabSection(index)}>
                    <a
                        href="#"
                        aria-current="page"
                        className={`md:p-4 p-2 ${_acTab.activeTabSection === index ? "text-white bg-gray-900 active" : "text-gray-500 hover:text-gray-600 hover:bg-gray-100"} inline-block rounded-t-lg`}
                    >
                        {section}
                    </a>
                </li>
            ))}
        </ul>
    );

    const renderTabButtons = (_as) => (
        _acTab.tabButtons.length > 0 &&
        _acTab.tabButtons[_acTab.activeTabSection]?.map((button, index) => {
            return (
                <InputFields.TabButton
                    key={index}
                    type={button}
                    _as = {_as}
                    route = {button == "CART" ? "/admin/cart":button == "GROUP"?"/admin/group":router.route}
                    clickButton={_acTab.setModalToggle}
                    placeholder={windowWidth < 700 ? "Add" : button}
                />
            );
        })
    );

    return (
        <>
            <nav className="pt-10 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
                <div className="w-full mx-auto items-center justify-between flex md:flex-nowrap flex-wrap md:px-10 px-4">
                    {/* mobile */}
                    <div className="md:hidden text-black text-lg uppercase font-bold flex justify-between w-full md:w-fit">
                        <div>{_acTab.title}</div>
                        <div className='flex gap-2'>
                            <div onClick={() => _as.setModalToggle('/admin/group')} className=" text-xs flex items-center bg-white text-black shadow-sm rounded-2xl px-3 py-1 hover:shadow-none" >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="text-black size-6 font-block">
                                        <path fill-rule="evenodd" d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z" clip-rule="evenodd" />
                                        <path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
                                </svg>
                                &nbsp; {_as?.user?.groups?.find((group) => group._id === localStorage.getItem('projectLifestyle_activeGroup'))?.members.length || 0}
                                </div>
                            <div onClick={() => _as.setModalToggle('/admin/cart')} className=" text-xs flex items-center bg-white text-black shadow-sm rounded-2xl px-3 py-1 hover:shadow-none" >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="size-6"
                                >
                                    <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
                                </svg>
                                &nbsp; {_as?.cart?.length}
                            </div>
                        </div>
                        
                    </div>
                    
                    {windowWidth < 700 ? (
                        <>
                            {renderTabSections()}
                        </>
                    ) : (
                        <>
                            {renderTabSections()}
                            <div className='flex'>
                                {renderTabButtons(_as)}
                            </div>
                        </>
                    )}
                </div>
            </nav>
        </>
    );
};

Tabs.Tab = Tab;

export { Tabs, Tab };
