import React from "react";
import { useRouter } from "next/router";
import Footer from "../components/Footer";
import Header from "../components/Header";
import InfoCard from "../components/InfoCard";
import { format } from "date-fns";
import { v4 as uuidv4 } from "uuid";

function Search({ searchResults }) {
  const router = useRouter();

  console.log(searchResults);

  const { location, startDate, endDate, numOfGuests } = router.query;

  const formattedStartDate = format(new Date(startDate), "dd MMMM yy");
  const formattedEndDate = format(new Date(endDate), "dd MMMM yy");
  const range = `${formattedStartDate} - ${formattedEndDate}`;

  const capitalizedLocation =
    location.charAt(0).toUpperCase() + location.slice(1);

  return (
    <div className="">
      <Header placeholder={`${location} | ${range} | ${numOfGuests} guests`} />
      <main className="flex">
        <section className="flex-grow pt-14 px-6">
          <p className="text-xs">
            300+ Stays - {range} - {numOfGuests} guests{" "}
          </p>
          <h1 className="text-3xl font-semibold mt-2 mb-6">
            Stays in {capitalizedLocation}
          </h1>
          <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
            <p className="button">Cancellation</p>
            <p className="button">Type of Places</p>
            <p className="button">Price</p>
            <p className="button">Room and Bed</p>
            <p className="button">More filters</p>
          </div>

          <div>
            {searchResults?.map((item) => (
              <InfoCard
                key={uuidv4()}
                img={item.img}
                location={item.location}
                title={item.title}
                description={item.description}
                star={item.star}
                price={item.price}
                total={item.total}
              />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Search;

export async function getServerSideProps() {
  const searchResults = await fetch("https://links.papareact.com/isz").then(
    (res) => res.json()
  );
  return {
    props: {
      searchResults,
    },
  };
}
