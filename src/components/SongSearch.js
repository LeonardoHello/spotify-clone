import React from 'react'
import Artist from "./Artist";
import Next from "./Next";

const SongSearch = ({ tracks, next, prev, settingInf, pages, currentPage }) => {
  return (
    <div id='song-search'>
      <div id='songs' >
        {tracks.map((elem, index) => <Artist key={index} img={elem.album.images['2'].url} artistName={elem.artists['0'].name} songName={elem.name} uri={elem.uri} settingInf={settingInf}/>)}
      </div>
      <div>
      {tracks.length !== 0 ? <Next next={next} prev={prev} pages={pages} currentPage={currentPage} /> : null}
      </div>
    </div>
  )
}

export default SongSearch