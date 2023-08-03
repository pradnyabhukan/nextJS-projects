import "bootstrap/dist/css/bootstrap.css";
import styles from "../globals.css";
import Image from "next/image";

export default async function MovieDetail(params) {
  const {
    params: { movie },
  } = params;
  const imgPath = "https://image.tmdb.org/t/p/original";
  //fetching basic data
  const data = await fetch(
    `https://api.themoviedb.org/3/movie/${movie}?api_key=${process.env.API_KEY}`, {next: {revalidate:0}}
  );
  const res = await data.json();
  //fetch credits
  const creditsData = await fetch(`https://api.themoviedb.org/3/movie/${movie}/credits?api_key=${process.env.API_KEY}`);
  const credits = await creditsData.json();
  const directors = credits.crew.filter((crew_member) => crew_member.job === "Director")
                        .map((director) => director.name)
  console.log(directors);
  //fetch videos
  const trailerData = await fetch(`https://api.themoviedb.org/3/movie/${movie}/videos?api_key=${process.env.API_KEY}`);
  const trailer = await trailerData.json();
  const key = trailer.results.filter((result) => result.name === "Official Trailer").map((video) => video.key);
    console.log("yt key:",key);
    const videoLink = `https://www.youtube.com/embed/${key}?autoplay=1&mute=1&controls=0`;
    console.log("yt link", videoLink);
   
    const bgImg = imgPath + res.backdrop_path;
    const containerStyle = {
      backgroundImage: `url(${bgImg})`
    };

  return (
    <div className=" vh-100 d-flex justify-content-center align-items-center bg-image" style={containerStyle}>
      <div className="card-bg">
        <h1 className="display-1 text-center py-4">{res.title}</h1>
        <div className=" d-flex justify-content-center">
        {/* <Image 
          src={imgPath + res.backdrop_path}
          alt={res.title}
          className="img-fluid"
          width={800}
          height={600}
          priority
        /> */}
        <iframe width="420" height="315"
          src={videoLink}>
        </iframe>
        </div>

        
        <div className="container  pt-4">
        <h6>Director : {directors}</h6>
        <h6>Release Date : {res.release_date}</h6>
        <h6>Duration : {res.runtime} minutes</h6>
        <h6>Rating : {res.vote_average}</h6>
        <p>{res.overview}</p>
        </div>
        
      </div>
    </div>
  );
}
