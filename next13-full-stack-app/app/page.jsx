"use client";
import "bootstrap/dist/css/bootstrap.css";
import Movie from "./Movie";
import { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function Home() {

  // "https://api.themoviedb.org/3/movie/popular";
  const [res, setRes] = useState(null);
  const [heading, setHeading] = useState("Most Popular Movies");
  const getData = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    );
    setRes(await data.json());
  };
  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = async (event) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();
    // Get data from the form.
    console.log("inside handle submit");
    const value = event.target.searchQuery.value;
    if (value === "") {
      console.log("value is empty");
      setHeading("Most Popular Movies")
      getData();
    } else {
      setHeading(`"${value}" results`)
      console.log(`Is this your value: ${value}`);
      const movieAPI = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${value}&api_key=${process.env.NEXT_PUBLIC_API_KEY}`
      );
      const response = await movieAPI.json();
      console.log(response);
      setRes(response);
    }
  };
  return (
    <>
    <div class="background-image"></div>
    <div className="container content">
      <div>
        <form
          onSubmit={handleSubmit}
          className="d-flex justify-content-center align-items-center"
        >
          <input
            className="my-4 px-4"
            type="text"
            name="searchQuery"
            id="searchQuery"
            placeholder="Search a movie"
            style={{
              width: "50%",
              height: "30px",
              borderRadius: "20px 0 0 20px",
              border: "none",
            }}
          />
          <button
            type="submit"
            className="btn"
            style={{
              backgroundColor: "white",
              height: "30px",
              borderRadius: "0 20px 20px 0",
              border: "none",
            }}
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>
      </div>
      <h1 className="display-1 py-4 text-center custom-heading">{heading}</h1>
      <div className="container py-4">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
          {res?.results
          ?.filter((result) => result.poster_path !== null)
          ?.map((movie) => (
            <div className="d-flex col mb-4" key={movie.id}>
              <Movie
                id={movie.id}
                title={movie.title}
                poster_path={movie.poster_path}
                release_date={movie.release_date}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}
