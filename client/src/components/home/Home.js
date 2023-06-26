import { useEffect, useState } from "react";

export const Home = () => {
    const [result, setResult] = useState()

    useEffect(() => {
        async function fetchData() {
          // const result = await getRequest("/api/projects");
          const response = await fetch('/api/projects', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          });   
          console.log(response)
          const result = await response.json();
          setResult(result)
          
        }
        fetchData();
      }, []);

  return (
    <div><pre>{JSON.stringify(result, null, 2)}</pre></div>
  );
};