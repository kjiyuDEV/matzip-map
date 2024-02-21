import Head from "next/head";
import Image from "next/image";
import Header from "@/components/common/Header";
import { Fragment, useState } from "react";
import MapComponent from "@/components/map/MapComponent";
// import dbConnect from "@/db/database";
;


export default function Home() {
  const [searchInput, setSearchInput] = useState<string>('');
  // const client = await dbConnect;
  // console.log(client)

  return (
    <Fragment>

      <div className="main-wrap">
        <Header setSearchInput={setSearchInput} searchInput={searchInput} />
        <MapComponent />

      </div>
    </Fragment>
  );
}
