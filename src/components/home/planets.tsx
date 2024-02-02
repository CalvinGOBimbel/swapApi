'use client'
import Link from "next/link";
import React, { useState, useEffect } from "react";

interface Planet {
  name: string;
  diameter: string;
  population: string;
  terrain: string;
  url:string;
}

interface ApiResponse {
  results: Planet[];
  next: string | null;
}

async function getData(url: string): Promise<ApiResponse> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Gagal Fetch Data');
  }
  return res.json();
}

const Planets: React.FC = () => {
  const [data, setData] = useState<ApiResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData('https://swapi.dev/api/planets');
        setData(result);
      } catch (error) {
        console.error('Gagal Fetch Data');
      }
    };

    fetchData();
  }, []);

  const handleClick = async () => {
    try {

      if (data && data.next) {
        const nextPageData = await getData(data.next);
        console.log(nextPageData.next);
        setData((prevData) => ({
          ...prevData!,
          results: [...prevData!.results, ...nextPageData.results],
          next: nextPageData.next,
        }));
      } else {
        alert('Max pages');
      }
    } catch (error) {
      console.error('Gagal Fetch Data');
    }
  };

  console.log(data?.results);
  
  return (
    <>
      <div className="m-4">
        <h1>Planets</h1>
        <button onClick={handleClick}>Next</button>
        <div className="grid grid-cols-5 gap-4">
          {data &&
            data.results.map((planet, index) => (
              <ul key={index} className="h-34 p-4 bg-[#E3E1D9] hover:bg-[#C7C8CC]">
                <li>
                  <div>
                    <h1><b>Name : </b>{planet.name}</h1>
                    <p><b>Diameter : </b>{planet.diameter}</p>
                    <p><b>Population : </b>{planet.population}</p>
                    <p><b>Terrain : </b>{planet.terrain}</p>
                    <p>{planet.url}</p>
                    <Link href={{
                        pathname: '/detail',
                        query: { url: planet.url}
                      }} 
                      className="mt-2 p-2 flex border-solid border-2 border-black w-20">
                      Detail
                    </Link>
                  </div>
                </li>
              </ul>
            ))}
        </div>
      </div>
    </>
  );
};

export default Planets;