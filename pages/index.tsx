import Head from "next/head";
import Image from "next/image";
import Header from "@/components/common/Header";
import { Fragment, useState } from "react";
import MapComponent from "@/components/map/MapComponent";
import dbConnect from "../lib/dbConnect";
import { GetServerSideProps } from "next";
import place, { Places } from "@/models/place";

type Props = {
  places: Places[];
};

const Index = () => {
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

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  await dbConnect();

  /* find all the data in our database */
  const result = await place.find({});

  /* Ensures all objectIds and nested objectIds are serialized as JSON data */
  const placesProps = result.map((doc) => {
    const pet = JSON.parse(JSON.stringify(doc));
    return pet;
  });

  return { props: { places: placesProps } };
};

export default Index;
