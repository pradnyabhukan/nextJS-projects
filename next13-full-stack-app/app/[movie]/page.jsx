import "bootstrap/dist/css/bootstrap.css";

export default async function MovieDetail(params) {
  const {
    params: { movie },
  } = params; //access movie id

  // fetching basic movie data
  const data = await fetch(
    `https://api.themoviedb.org/3/movie/${movie}?api_key=${process.env.API_KEY}`,
    { next: { revalidate: 0 } }
  );
  const res = await data.json();

  //genres

  const genresArray = res.genres;
  const generesId = genresArray.map((genre) => genre.id);
  const genresName = genresArray.map((genre) => genre.name);
  // Map the genre names to an array of <li> elements
  const genresList = genresArray.map((genre) => (
    <li key={genre.id}>{genre.name}</li>
  ));

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
    backgroundImage: `url(${bgImg})`,
  };

  const totalStars = 10;
  const filledStars = Math.round(res.vote_average);
  console.log(filledStars)

  return (
    <div className="bg-image" style={divStyle}>
      <div className="blur-overlay"></div>
      <div className="custom-card">
        <div className="text-center py-5">
          <h1>A film by</h1>
          <h1 className="display-1">{directors}</h1>
        </div>
        <div className="d-flex justify-content-between" >
          <h2>{res.title}</h2>
          <h4 className="">
          {genresArray.map((genre) => (
            <div
              className="genre-button"
              key={genre.id}
              data-genre-id={genre.id}
            >
              {genre.name}
            </div>
          ))}
        </h4>
        </div>
        
        <div className="starRating">
          {[...Array(totalStars)].map((_, index) => (
            <span
              key={index}
              className={
                index < filledStars ? "starFilled" : "starEmpty"
              }
            >
              ★
            </span>
          ))}
        </div>
        <p>{res.overview}</p>
      </div>
    </div>
  );
}
