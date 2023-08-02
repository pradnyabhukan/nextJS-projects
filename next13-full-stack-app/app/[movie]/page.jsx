import "bootstrap/dist/css/bootstrap.css";
import styles from "../page.module.css";
import Image from "next/image";

export default async function MovieDetail(params) {
  const {
    params: { movie },
  } = params;
  const imgPath = "https://image.tmdb.org/t/p/original";
  const data = await fetch(
    `https://api.themoviedb.org/3/movie/${movie}?api_key=${process.env.API_KEY}`, {next: {revalidate:0}}
  );
  const res = await data.json();
  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="container">
        <h1 className="display-1 text-center py-4">{res.title}</h1>
        <div className=" d-flex justify-content-center">
        <Image 
          src={imgPath + res.backdrop_path}
          alt={res.title}
          className="img-fluid"
          width={1600}
          height={600}
          priority
        />
        
        </div>

        
        <div className="container  pt-4">
        <h6>Release Date : {res.release_date}</h6>
        <h6>Duration : {res.runtime} minutes</h6>
        <h6>Rating : {res.vote_average}</h6>
        <p>{res.overview}</p>
        </div>
        
      </div>
    </div>
  );
}
