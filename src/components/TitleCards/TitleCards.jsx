import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import './TitleCards.css'
import { Link } from 'react-router-dom';


const TitleCards = ({title, category}) => {

const [apiData, setApiData] = useState([]);
const cardsRef = useRef();

const options = useMemo(() => ({
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZGFkYjQzMmU2YTc0OWQ5ODhjYjYyMzE4NzFkODZjNSIsIm5iZiI6MTc3ODg4NzEwMC41NDgsInN1YiI6IjZhMDdhOWJjZmI4MGY2ODJjMzY2M2Q0ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ihmkc6svPL7C1UFz52kQSZMt_YGDnOpuJ2Hh9wceKOI'
  }
}), []);

const handleWheel = useCallback((event) => {
  event.preventDefault();
  if (cardsRef.current) {
    cardsRef.current.scrollLeft += event.deltaY;
  }
}, []);

useEffect(() => {
  fetch(`https://api.themoviedb.org/3/movie/${category ? category : 'now_playing'}?language=en-US&page=1`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results))
    .catch(err => console.error(err));
}, [category, options]);

useEffect(() => {
  const cardList = cardsRef.current;
  if (!cardList) return;

  cardList.addEventListener('wheel', handleWheel, { passive: false });

  return () => {
    cardList.removeEventListener('wheel', handleWheel);
  };
}, [handleWheel]);

  return (
    <div className='title-cards'>
      <h2>{title?title:"Popular On Netflix"}</h2>
      <div className='card-list' ref={cardsRef}>
        {apiData.map((card, index)=>{
          return <Link to={`/player/${card.id}`} className='card' key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards
