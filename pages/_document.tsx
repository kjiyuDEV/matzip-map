import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      {/* <script
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_MAP_KEY}&callback=CALLBACK_FUNCTION`}
        defer={false}
      ></script> */}
      <script
        type="text/javascript"
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NCP_CLIENT_ID}&submodules=geocoder`}
      ></script>
      <Head />
      <body id="smooth-scroll">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
