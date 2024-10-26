import React from 'react';

function MobileUI(props) {
    return (
        <div
		className="w-full absolute top-0 mx-auto sm:w-6/12 lg:w-4/12 xl:w-4/12  overflow-y-scroll space-y-3 border-8 rounded-3xl bg-white border-gray-800 shadow-2xl z-10">
		<div className="realtive sticky top-0  h-36 w-full rounded-b-3xl bg-center cursor-pointer object-cover z-10 shadow-lg bg-[url('https://images.unsplash.com/reserve/8T8J12VQxyqCiQFGa2ct_bahamas-atlantis.jpg?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80')]">
			<nav className="p-2 flex flex-grow relative justify-between z-10 items-center mx-auto h-18">
				<div className="inline relative">
					<button type="button" className="inline-flex items-center relative text-gray-300 hover:text-white mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M4 6h16M4 12h8m-8 6h16"></path>
                            </svg>
                        </button>
				</div>
				<div className="inline-flex">
					<a href="/">
						<div className="hidden">
							<svg width="102" height="32" fill="currentcolor" >
								
							</svg>
						</div>
					</a>
				</div>
				<div className="flex-initial">
					<div className="flex justify-end items-center relative">
						<div className="inline relative">
							<div className="block flex-grow-0 flex-shrink-0">
								<img className="rounded-xl w-8 h-8 border border-yellow-300 shadow"
                                        src="https://media-exp1.licdn.com/dms/image/C5603AQGEQ6ydraNeww/profile-displayphoto-shrink_200_200/0/1623517758261?e=1629331200&v=beta&t=mhUiw4p21E9okkvInvM0ry8lmLsT6s5ppWMKo6kFs2M" />
                                </div>
							</div>
						</div>
					</div>
			</nav>
			<div className="px-3 rounded-lg  flex flex-col w-full">
				<h4 className="text-white text-xl font-semibold  leading-tight truncate">Loremipsum Title
				</h4>
				<div className="flex justify-between items-center ">
					<div className="flex flex-col">
						<h2 className="text-sm flex items-center text-gray-100 font-normal">
							<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24"
								stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
									d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z">
								</path>
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
									d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
							</svg>
							Massive Dynamic
						</h2>
					</div>
				</div>
			</div>

			<div className="flex items-center justify-between mt-3 px-3 z-10">
				<div className="relative w-full">
					<input type="text" className="bg-purple-white shadow rounded-xl border-0 p-3 w-full"
                            placeholder="Search somthing..." />
					<div className="absolute top-0 right-0 p-4 pr-3 text-purple-lighter">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
							stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
						</svg>
					</div>
				</div>
			</div>
		</div>
		<div className=" p-3 space-y-4 z-0">
			<h4 className="font-semibold mt-2">Category</h4>
			<div className="flex items-center justify-between overflow-y-scroll text-gray-500 cursor-pointer space-x-3">
				<div
					className="flex flex-col items-center justify-center w-20  h-20  bg-green-200 rounded-2xl text-green-600 shadow hover:shadow-md cursor-pointer mb-2 p-1 bg-white transition ease-in duration-300">
					<i className="far fa-hotel"></i>
					<p className="text-sm mt-1">Hotel</p>
				</div>
				<div
					className="flex flex-col items-center justify-center w-20  h-20  bg-yellow-200 rounded-2xl text-yellow-600  shadow hover:shadow-md cursor-pointer mb-2 p-1 bg-white transition ease-in duration-300">
					<i className="far fa-bus"></i>
					<p className="text-sm mt-1">Bus</p>
				</div>

				<div
					className="flex flex-col items-center justify-center w-20  h-20  bg-indigo-200  rounded-2xl  text-indigo-500 shadow hover:shadow-md cursor-pointer mb-2 p-1 bg-white transition ease-in duration-300">
					<i className="far fa-mountains"></i>
					<p className="text-sm mt-1">Hills</p>
				</div>
				<div
					className="flex flex-col items-center justify-center w-20  h-20  bg-pink-200   rounded-2xl text-pink-500 shadow hover:shadow-md cursor-pointer mb-2 p-1 bg-white transition ease-in duration-300">
					<i className="far fa-umbrella-beach"></i>
					<p className="text-sm mt-1">Beach</p>
				</div>
			</div>
			<h4 className="font-semibold">Recomented Hotels</h4>
			<div className="grid m-0  grid-cols-2  space-x-4 overflow-y-scroll flex justify-center items-center w-full ">
				<div className="relative flex flex-col justify-between   bg-white shadow-md rounded-3xl  bg-cover text-gray-800  overflow-hidden cursor-pointer w-full object-cover object-center rounded-lg shadow-md h-64 my-2 bg-[url('https://images.unsplash.com/reserve/8T8J12VQxyqCiQFGa2ct_bahamas-atlantis.jpg?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80')]">
					<div className="absolute bg-gradient-to-t from-green-400 to-blue-400  opacity-50 inset-0 z-0"></div>
					<div className="relative flex flex-row items-end  h-72 w-full ">
						<div className="absolute right-0 top-0 m-2">
							<svg xmlns="http://www.w3.org/2000/svg"
								className="h-9 w-9 p-2 text-gray-200 hover:text-blue-400 rounded-full hover:bg-white transition ease-in duration-200 "
								fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
									d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
							</svg>
						</div>
						<div className="p-6 rounded-lg  flex flex-col w-full z-10 ">
							<h4 className="mt-1 text-white text-xl font-semibold  leading-tight truncate">Loremipsum..
							</h4>
							<div className="flex justify-between items-center ">
								<div className="flex flex-col">
									<h2 className="text-sm flex items-center text-gray-300 font-normal">
										<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none"
											viewBox="0 0 24 24" stroke="currentColor">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
												d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z">
											</path>
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
												d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
										</svg>
										Dubai
									</h2>
								</div>
							</div>
							<div className="flex pt-4  text-sm text-gray-300">
								<div className="flex items-center mr-auto">
									<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-1"
										viewBox="0 0 20 20" fill="currentColor">
										<path
											d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
										</path>
									</svg>
									<p className="font-normal">4.5</p>
								</div>
								<div className="flex items-center font-medium text-white ">
									$1800
									<span className="text-gray-300 text-sm font-normal"> /wk</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="relative flex flex-col justify-between   bg-white shadow-md  rounded-3xl  bg-cover text-gray-800  overflow-hidden cursor-pointer w-full object-cover object-center rounded-lg shadow-md h-64 my-2 bg-[url('https://images.unsplash.com/reserve/8T8J12VQxyqCiQFGa2ct_bahamas-atlantis.jpg?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80')]">  
					<div className="absolute bg-gradient-to-t from-blue-500 to-yellow-400  opacity-50 inset-0 z-0"></div>
					<div className="relative flex flex-row items-end  h-72 w-full ">
						<div className="absolute right-0 top-0 m-2">
							<svg xmlns="http://www.w3.org/2000/svg"
								className="h-9 w-9 p-2 text-gray-200 hover:text-blue-400 rounded-full hover:bg-white transition ease-in duration-200 "
								fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
									d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
							</svg>
						</div>
						<div className="p-5 rounded-lg  flex flex-col w-full z-10 ">
							<h4 className="mt-1 text-white text-xl font-semibold  leading-tight truncate">Loremipsum..
							</h4>
							<div className="flex justify-between items-center ">
								<div className="flex flex-col">
									<h2 className="text-sm flex items-center text-gray-300 font-normal">
										<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none"
											viewBox="0 0 24 24" stroke="currentColor">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
												d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z">
											</path>
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
												d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
										</svg>
										India
									</h2>
								</div>
							</div>
							<div className="flex pt-4  text-sm text-gray-300">
								<div className="flex items-center mr-auto">
									<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-1"
										viewBox="0 0 20 20" fill="currentColor">
										<path
											d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
										</path>
									</svg>
									<p className="font-normal">4.5</p>
								</div>
								<div className="flex items-center font-medium text-white ">
									$1800
									<span className="text-gray-300 text-sm font-normal"> /wk</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<h4 className="font-semibold">Suggested By</h4>
			<div className="grid grid-cols-1">
				<div className="">
					<div className="flex  bg-white shadow-md  rounded-2xl p-2">
						<img src="https://images.unsplash.com/photo-1439130490301-25e322d88054?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1189&q=80"
                                alt="Just a flower" className=" w-16  object-cover  h-16 rounded-xl" />
						<div className="flex flex-col justify-center w-full px-2 py-1">
							<div className="flex justify-between items-center ">
								<div className="flex flex-col">
									<h2 className="text-sm font-medium">Massive Dynamic</h2>
								</div>
								<svg xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5 text-gray-500 hover:text-blue-400 cursor-pointer" fill="none"
									viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
										d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
								</svg>
							</div>
							<div className="flex pt-2  text-sm text-gray-400">
								<div className="flex items-center mr-auto">
									<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-1"
										viewBox="0 0 20 20" fill="currentColor">
										<path
											d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
										</path>
									</svg>
									<p className="font-normal">4.5</p>
								</div>
								<div className="flex items-center font-medium text-gray-900 ">
									$1800
									<span className="text-gray-400 text-sm font-normal"> /wk</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div
			className="sticky bottom-2  p-5 px-6 m-2   flex items-center justify-between   bg-gray-900 shadow-3xl text-gray-400 rounded-2xl cursor-pointer">
			<div className="flex flex-col items-center transition ease-in duration-200 hover:text-blue-400 ">
				<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
					stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
						d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z">
					</path>
				</svg>
			</div>
			<div className="flex flex-col items-center transition ease-in duration-200 hover:text-blue-400 ">
				<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
					stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
						d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
				</svg>
			</div>
			<div className="flex flex-col items-center  hover:text-blue-400 ">
				<div
					className="absolute bottom-5 shadow-2xl text-center flex items-center justify-center rounded-full border-4 text-3xl border-gray-50 hover:border-blue-500 bg-blue-500 w-20 h-20 p-2 text-white transition ease-in duration-200 ">
					<i className="fas fa-phone-alt"></i>
					<span
                            className="animate-ping absolute inline-flex h-full w-full rounded-full border-4 opacity-50"></span>
				</div>
			</div>
			<div className="flex flex-col items-center transition ease-in duration-200 hover:text-blue-400 ">
				<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
					stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
						d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
				</svg>
			</div>
			<div className="flex flex-col items-center transition ease-in duration-200 hover:text-blue-400 ">
				<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
					stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
						d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z">
					</path>
				</svg>
			</div>
		</div>
	</div>
    );
}

export default MobileUI;