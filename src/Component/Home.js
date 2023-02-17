import React, { useEffect, useState } from 'react'
import ShowQue from './ShowQue';


export default function Home() {
  const [isplay, setisplay] = useState(false);
  const [data, setData] = useState(null);
  const [vis, setVis] = useState('flexCenter');



  useEffect(() => {
    localStorage.removeItem('playing')
    fetch('https://the-trivia-api.com/api/questions')
      .then(res => res.json())
      .then(data => setData(data))
  }, [])


  function play() {

    if (localStorage.getItem('isLogIn')) {
      setisplay(true);
      setVis('hidden');
      localStorage.setItem("playing", true);

    }
    else {
      alert("Please Log in");
    }
  }
  function gameover() {
    setData(null);
    setVis('flexCenter');
    setisplay(false);
    localStorage.removeItem('playing');
    window.location.reload()
  }


  return (

    <div>

      <div className={vis}>
        <div>
          <img className='homeImg' src='https://elitequiz.wrteam.in/images/slider/1668511040.png'></img>
        </div>
        <div className='flexcenter'>
          <div className='fontBold'>Be Ready</div>
          <div className='fontBold'>No one can stop you.</div>
          <button className='letsPlay' onClick={play}>Lets Play</button>
        </div>

      </div>

      {isplay == true &&


        <div>
          {data !== null && <ShowQue data={data} gameover={gameover}></ShowQue>}


        </div>
      }



    </div>
  )
}
