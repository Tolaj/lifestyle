import React from "react";

// components

import Navbar from "components/Navbars/AuthNavbar.js";
import FooterSmall from "components/Footers/FooterSmall.js";

export default function Auth({ children }) {
  return (
    <>
      <Navbar transparent />
      <main>
        <section className="relative w-full h-full max-h-screen min-h-screen overflow-hidden">
          <div className="absolute top-0 w-full h-full bg-[#161616] bg-no-repeat bg-full"
            // style={{
            //   backgroundImage: "url('/img/register_bg_2.png')",
            // }}
          ></div>
          {children}
          {/* <FooterSmall absolute /> */}
        </section>
      </main>
    </>
  );
}
