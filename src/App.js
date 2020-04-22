import React, { useState, useEffect } from "react";
import Main from "./components/Main";

function App() {
  const [dataMobiles, setDataMobiles] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  const getData = async () => {
    try {
      const resp = await fetch(
        `https://jsonbin.org/huongnguyen-2301/blog/page${pageNumber}`,
        {
          method: "GET",
          headers: {
            Authorization: "token 9a1ee40e-0a07-43f2-86fc-705a53d5de8b",
            "Content-Type": "application/json",
          },
        }
      );
      if (resp.ok) {
        const data = await resp.json();
        let dataApi = dataMobiles.concat(data);
        setDataMobiles(dataApi);
      }
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    getData();
    window.addEventListener("scroll", handleScroll);
  }, []);

  function handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight
    ) {
      setPageNumber(pageNumber + 1);
      console.log('end')
    }
  }

  useEffect(() => {
    getData();
  }, [pageNumber]);
  return (
    <div className="App">
      <Main mobiles={dataMobiles} />
    </div>
  );
}

export default App;
