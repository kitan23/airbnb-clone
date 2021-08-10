import { useState, useEffect } from "react";
import Head from "next/head";
import Header from "../components/Header";
import Banner from "../components/Banner";
import SmallCard from "../components/SmallCard";
import MediumCard from "../components/MediumCard";
import { v4 as uuidv4 } from "uuid";
import LargeCard from "../components/LargeCard";
import Footer from "../components/Footer";

export default function Home({ exploreData, cardsData }) {
  let listener = null;
  const [scrollState, setScrollState] = useState("top");
  useEffect(() => {
    listener = document.addEventListener("scroll", (e) => {
      var scrolled = document.scrollingElement.scrollTop;
      if (scrolled >= 30) {
        if (scrollState != "amir") {
          setScrollState("amir");
        }
      } else {
        if (scrollState != "top") {
          setScrollState("top");
        }
      }
    });
    return () => {
      document.removeEventListener("scroll", listener);
    };
  }, [scrollState]);

  return (
    <div className="">
      <Head>
        <title>Airbnb-Clone</title>
      </Head>

      {/* BOTH HEADER AND BANNER  */}
      {/* {scrollState === "amir" && <Header background="white" />} */}
      <Header scrollState={scrollState} />
      <Banner scrollState={scrollState} />

      <main className="max-w-5xl mx-auto px-8 ">
        <section className="pt-5">
          <h2 className="text-2xl md:text-4xl font-semibold pb-5">
            Explore Nearby
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {exploreData?.map((item) => (
              <SmallCard
                key={uuidv4()}
                img={item.img}
                location={item.location}
                distance={item.distance}
              />
            ))}
          </div>
        </section>

        <section className="mt-3">
          <h2 className="text-2xl md:text-4xl font-semibold py-7">
            Live Anywhere
          </h2>
          <div className="flex space-x-3 overflow-scroll scrollbar-hide p-3 -ml-3">
            {cardsData?.map((item) => (
              <MediumCard key={uuidv4()} img={item.img} title={item.title} />
            ))}
          </div>
        </section>

        <LargeCard
          img="https://links.papareact.com/4cj"
          title="The Greatest Outdoors"
          description="Wishlists curated by Airbnb"
          buttonText="Get Inspired"
        />
      </main>

      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  const exploreData = await fetch("https://links.papareact.com/pyp").then(
    (res) => res.json()
  );

  const cardsData = await fetch("https://links.papareact.com/zp1").then((res) =>
    res.json()
  );
  return {
    props: {
      exploreData,
      cardsData,
    },
  };
}
