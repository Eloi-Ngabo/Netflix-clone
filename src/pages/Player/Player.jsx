import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {

  const {id} = useParams();
  const navigate = useNavigate();



  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: ""
  })

useEffect(()=>{
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZGFkYjQzMmU2YTc0OWQ5ODhjYjYyMzE4NzFkODZjNSIsIm5iZiI6MTc3ODg4NzEwMC41NDgsInN1YiI6IjZhMDdhOWJjZmI4MGY2ODJjMzY2M2Q0ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ihmkc6svPL7C1UFz52kQSZMt_YGDnOpuJ2Hh9wceKOI'
    }
  };

  fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(res => res.json())
    .then(res => {
      const trailer = res.results?.[0];
      if (trailer) setApiData(trailer);
    })
    .catch(err => console.error(err));
}, [id])

  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="" onClick={()=> navigate('/')}/>
      <iframe width='90%' height='90%'
       src={`https://www.youtube.com/embed/${apiData.key}`}
       title='trailer' frameBorder='0' allowFullScreen></iframe>
       <div className="player-info">
         <p>{apiData.published_at.slice(0,10)}</p>
         <p>{apiData.name}</p>
         <p>{apiData.type}</p>
       </div>
    </div>
  )
}

export default Player
