import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>

          <link rel="manifest" href="/manifest.json" />
          <meta charSet="utf-8" />
          <meta name="theme-color" content="#000000" />
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
          <link rel="shortcut icon" href="/icon512_rounded.png" />
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href="/icon512_maskable.png"
          />



          <link
            rel="stylesheet"
            href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
          />

        </Head>
        <body style={{ touchAction: "pan-x pan-y" }} className="text-blueGray-700 antialiased">
          <div id="page-transition"></div>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
