import "bootstrap/dist/css/bootstrap.css";

export default async function MovieDetail(params) {
  
  const { params: { movie },} = params; //access movie id
  
  // fetching basic movie data
  const data = await fetch(
    `https://api.themoviedb.org/3/movie/${movie}?api_key=${process.env.API_KEY}`,
    { next: { revalidate: 0 } }
  );
  const res = await data.json();

  //background image
  const imgPath = "https://image.tmdb.org/t/p/original";
  const bgImg = imgPath + res.backdrop_path;
  
  //fetch movie credits
  const creditsData = await fetch(
    `https://api.themoviedb.org/3/movie/${movie}/credits?api_key=${process.env.API_KEY}`
  );
  const credits = await creditsData.json();
  
  const directors = credits.crew
    .filter((crew_member) => crew_member.job === "Director")
    .map((director) => director.name);
  
    //fetch videos
  const trailerData = await fetch(
    `https://api.themoviedb.org/3/movie/${movie}/videos?api_key=${process.env.API_KEY}`
  );
  const trailer = await trailerData.json();
  const key = trailer.results
    .filter((result) => result.name === "Official Trailer")
    .map((video) => video.key);
  // console.log("yt key:", key);
  const videoLink = `https://www.youtube.com/embed/${key}?autoplay=1&mute=1&controls=0`;
  console.log("yt link", videoLink);

  const divStyle = {
    backgroundImage: `url(${bgImg})`
  };

  return (
    <div className="bg-image" style={divStyle}>
      <div className="blur-overlay"></div>
      <div className="custom-card">
        <h1>A film by</h1>
        <h1 className="display-1">{directors}</h1>
      </div>
    </div>
  );
}
