import Head from "next/head";
import Image from "next/image";
import Header from "@/components/common/Header";
import { Fragment, useState } from "react";
import MapComponent from "@/components/map/MapComponent";
;


export default function Home() {
  const [searchInput, setSearchInput] = useState<string>('');

  return (
    <Fragment>

      <div className="main-wrap">
        <Header setSearchInput={setSearchInput} searchInput={searchInput} />
        <MapComponent />

      </div>
    </Fragment>
  );
}
