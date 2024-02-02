"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Planet {
  name: string;
  climate: string;
  created: string;
  edited: string;
}

const Planet: React.FC = () => {
  const searchParams = useSearchParams();
  const url = searchParams.get("url") || "";
  console.log(url);
  const [planetData, setPlanetData] = useState<Planet | null>(null);
  const [isLoading, setIsLoading] = useState(true); 


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const fetchedData: Planet = await response.json(); // Pastikan data sesuai dengan antarmuka Planet
        setPlanetData(fetchedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);
  console.log(planetData);
  
  return (
    <>
      <div className="m-3 flex flex-col">
      <h1>Planet</h1>
      {isLoading && <p>Loading...</p>} 
      {planetData && !isLoading && ( 
        <div>
          <p><b>Name : </b>{planetData.name}</p>
          <p><b>Climate : </b>{planetData.climate}</p>
          <p><b>Created : </b>{planetData.created}</p>
          <p><b>Edited : </b>{planetData.edited}</p>
        </div>
      )}
    </div>
    </>
  )
}

export default Planet;
