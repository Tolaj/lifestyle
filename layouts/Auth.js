// layouts/Auth.js
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

          {children}
          {/* <FooterSmall absolute /> */}
        </section>
      </main>
    </>
  );
}
