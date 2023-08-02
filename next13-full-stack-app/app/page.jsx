import "bootstrap/dist/css/bootstrap.css";
import styles from "./page.module.css";
import Movie from "./Movie";
export default async function Home() {
  "https://api.themoviedb.org/3/movie/popular";
  const data = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`
  );
  const res = await data.json();
  console.log(res);
  return (
    <div className="container home">
      <h1 className="display-1 py-4 text-center">Most Popular Movies!</h1>
      <div className="container py-4">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
          {res.results.map((movie) => (
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
  );
}
