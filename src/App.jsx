import { Button, Container, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState(null);
  const [page, setPage] = useState(0);

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://hn.algolia.com/api/v1/search?query=${query}&page=${page}`);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [query, page]);

  const handleShowMore = () => {
    setPage(page + 1);
  };

  return (
    <Container maxWidth="md">
      <TextField
        sx={{ width: "70%" }}
        id="outlined-basic"
        label="Search"
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button sx={{ width: "20%", height: "5.5vh", backgroundColor: "#cfe8fc", marginLeft: "5%", color: "" }}>
        Search
      </Button>

      {data && (
        <div style={{ padding: "10px" }}>
          {data.hits.map((item) => (
            <div key={item.objectID}>
              <h2>{item.author}</h2>
              <p>{item.story_text}</p>
              <a href={item.url}>{item.title}</a>
            </div>
          ))}
          <Button sx={{ width: "100%", marginTop: "4%" }} onClick={handleShowMore} variant="contained" color="primary">
            Show More
          </Button>
        </div>
      )}
    </Container>
  );
}

export default App;
