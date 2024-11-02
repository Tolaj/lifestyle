/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect, useState } from "react";
import useInstallPrompt from '../utils/useInstallPrompt';
import { useRouter } from "next/router";


// default redirection 
// export async function getServerSideProps(context) {
//   return {
//     redirect: {
//       destination: '/auth/login',
//       permanent: false,
//     },
//   }
// }
export default function Index() {
	const { installApp, isIos, isInStandaloneMode } = useInstallPrompt();
	const [windowWidth, setWindowWidth] = useState(null);
	const router = useRouter()
	useEffect(() => {
		
        setWindowWidth(window.outerWidth);
    }, []);

	const installAppOnDevice = () =>{	
		if(isIos){
			return alert("Tap the Share icon below, then select 'Add to Home Screen' to install the app.")
		}else{
 			return installApp()
		}
	}
	
	useEffect(()=>{isInStandaloneMode?router.push('/admin/dashboard'):""},[isInStandaloneMode])
	
	
  return (
    <>
      {/* <IndexNavbar fixed /> */}

	  	<div className="bg-[#161616] flex flex-col overflow-hidden min-h-screen max-h-screen relative ">
			<header>
				<nav class="  ">
					<div class="flex flex-wrap justify-between  my-6 md:my-12 items-center w-full ">

						<p class="font-bold text-[8px] md:text-xs capitalize w-52 md:w-96 md:px-7  mx-4 md:mx-8 leading-[1.3] text-[#dcdbdb]  ">Introducing Lifestyle. Track expenses, create grocery lists, and plan budgets—all in one place! Take control of your finances effortlessly!</p> 
						<div  class="z-index-top scale-10 md:scale-100 mx-4 md:mx-16 flex gap-2">
							<div onClick={()=>{installAppOnDevice()}}  class="text-sm text-[#cacaca] hover:cursor-pointer hover:text-black hover:bg-gray-200 border border-opacity-50 border-[#cacaca] rounded-3xl px-5 py-[7px] ">Install
							</div> 
							<div href="#" class=" md:block hidden text-sm text-[#cacaca] hover:cursor-pointer hover:text-black hover:bg-gray-200  border border-opacity-50 border-[#cacaca] rounded-3xl px-5 py-[7px]  ">Get Started
							</div>
						</div>
					</div>
				</nav>
			</header>
		<style>{`

		.logo {
			z-index: 100;
			width: 65%;
			height: auto;
		}

		.div-block-4 {
			justify-content: center;
			align-items: center;
			display: flex;
			position: absolute;
			bottom: auto;
			left: 0%;
			right: 0%;
		}


.sachets {
  justify-content: center;
  align-items: center;
  display: flex;
  overflow: hidden;
}

.sachet-1 {
  z-index: 99;
  position: absolute;
  bottom: auto;
  left: auto;
  right: auto;
}

.sachet-1.float-1 {
  width: 100%;
  position: static;
}

.sachet-1.mobile-only {
  display: none;
}

.sachet-4 {
  width: 12%;
  position: absolute;
  top: 59.6vh;
  bottom: auto;
  left: 13.4vw;
  right: auto;
}

.sachet-4.float {
  width: 100%;
  position: static;
}

.sachet-2 {
  width: 17%;
  position: absolute;
  
  left: auto;
  right: 11.2vw;
}

.sachet-2.float {
  width: 100%;
  position: static;
}

.sachet-5 {
  width: 7%;
  position: absolute;
  top: 40.15vh;
  left: auto;
  right: 38.4vw;
}

.sachet-5.float {
  width: 100%;
  position: static;
}

		`}</style>
			<div   class="sachets ">
				<div  class="div-block-4 absolute  top-[16%] md:top-[30.5%] ">
						<img src="assets/images/lifestyle2.png"   alt="" class="logo" />
				</div>
				<div  class="absolute animate-float  top-[1.5vh] hidden md:block" >
					<img class="sachet-5 float" src="assets/images/4.png" alt=""  sizes="(max-width: 767px) 100vw, 7vw"  />
				</div>
				<div  class="sachet-2 bottom-28 md:-bottom-4 animate-floatSlow  " >
					<img class="sachet-2 float " src="assets/images/3.png" alt=""  sizes="(max-width: 767px) 100vw, 17vw"   />
				</div>
				<div  class="sachet-4 animate-floatFast" >
					<img src="assets/images/2.png"    alt="" class="sachet-4 float" />
				</div>
				<div  class="sachet-1 top-[25.7vh] w-[88%] -mt-10 block md:hidden animate-float" >
					<img class="sachet-1 float-1 " src="assets/images/1.png" alt=""  sizes="(max-width: 767px) 100vw, 800px"    />
				</div>
				<div class="sachet-1 top-[25.7vh] md:top-[53.7vh]">
					<div class=" font-semibold mt-0 text-[#cacaca] text-base md:text-base flex flex-col items-center gap-4">
						<div class="py-4 block md:hidden"><img src="assets/images/logo.png" class="h-16  shadow-2xl shadow-red-50 rounded-full bg-white bg-opacity-20 " /></div>
						<a href="/shop" class="hover:text-white hover:cursor-pointer hover:underline">SHOP</a>
						<div class="hover:text-white hover:cursor-pointer hover:underline">GALLERY</div>
						<div class="hover:text-white hover:cursor-pointer hover:underline">ABOUT US</div>
						{/* <div class="hover:text-white hover:cursor-pointer hover:underline">CONTACT US</div> */}
						<a href="https://www.instagram.com/lastlords/" class="flex gap-6 md:gap-2 hover:text-white hover:cursor-pointer hover:underline">
							
							<svg
							xmlns="http://www.w3.org/2000/svg"
							class=" md:h-6 md:w-6 w-5 h-5"
							fill="currentColor"
							viewBox="0 0 24 24">
							<path
							d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
						</svg></a>
					</div>
				</div>
			</div>

			<div class=" text-[8px] md:text-sm capitalize absolute bottom-0 gap-2 md:gap-4 ml-4 font-semibold md:ml-6 my-6 text-[#cacaca] flex flex-row">
				<div class="hover:text-white hover:cursor-pointer hover:underline">privacy policy</div>
				<div class="hover:text-white hover:cursor-pointer hover:underline">terms & conditions</div>
				<div class="hover:text-white hover:cursor-pointer hover:underline">returns & refunds</div>
				<div class="hover:text-white hover:cursor-pointer hover:underline">© 2024 Noname pvt ltd</div>
			</div>

		</div>

      {/* <Footer /> */}
    </>

  );
}