import { Button, Card, CardContent, Container, Link, TextField, Typography } from "@mui/material";
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

  const handleSearch = () => {
    setPage(0); // Reset page to 0 when performing a new search
    fetchData(); // Fetch data when search button is clicked
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
      <Button
        sx={{ width: "20%", height: "5.5vh", backgroundColor: "#cfe8fc", marginLeft: "5%", color: "" }}
        onClick={handleSearch} // Call handleSearch function when search button is clicked
      >
        Search
      </Button>

      {data && (
        <div style={{ padding: "10px" }}>
          {data.hits.map((item) => (
            <Card key={item.objectID} style={{ marginBottom: "10px" }}>
              <CardContent>
                <Typography variant="h6">{item.title}</Typography>
                <Typography variant="subtitle1">{item.author}</Typography>
                <Typography variant="body1">{item.story_text}</Typography>
                <Link href={item.url} target="_blank" rel="noopener noreferrer">
                  Read more
                </Link>
              </CardContent>
            </Card>
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
