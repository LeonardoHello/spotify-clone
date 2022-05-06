import { useState, useEffect } from "react";
import useAuth from "../useAuth";
import SpotifyPlayer from 'react-spotify-web-playback';
import SongSearch from "./SongSearch";
import Lyrics from "./Lyrics";

const Dashboard = ({ code }) => {
  const accessToken = useAuth(code);
  
  const [currentPage, setcurrentPage] = useState(0);
  const [pages, setPages] = useState(0);
  const [info, setInfo] = useState('');
  const [lyrics, setLyircs] = useState('')
  const [uri, setUri] = useState('');
  const [search, setSearch] = useState('');
  const [tracks, setTracks] = useState([]);
  const [url, setUrl] = useState(`https://api.spotify.com/v1/search?type=track&include_external=audio&q=${search}`);

  useEffect(() => {
    setUrl(`https://api.spotify.com/v1/search?type=track&include_external=audio&q=${search}`)
  }, [search]);

  useEffect(() => {
    const settingSearch = async () => {
      const a = await apiSearch();
      if (search !== '') {
        setTracks(a.tracks.items);
      } else {
        setTracks([]);
      }
    }
    settingSearch();
  }, [url])

  useEffect(() => {
    const settingBtnDisplay = async () => {
      const a = await apiSearch();
      if (a !== undefined && document.getElementById('next') !== null) {
        if (a.tracks.previous === null && a.tracks.next !== null) {
          document.getElementById('prev').style.color = 'rgb(191, 191, 191)';
          document.getElementById('prev').style.border = '1px solid rgb(191, 191, 191)';
          document.getElementById('next').style.color = 'black';
          document.getElementById('next').style.border = '1px solid black'; 
        } else if (a.tracks.previous !== null && a.tracks.next === null) {
          document.getElementById('next').style.color = 'rgb(191, 191, 191)';
          document.getElementById('next').style.border = '1px solid rgb(191, 191, 191)';
          document.getElementById('prev').style.color = 'black';
          document.getElementById('prev').style.border = '1px solid black';
        } else if (a.tracks.previous === null && a.tracks.next === null) {
          document.getElementById('prev').style.color = 'rgb(191, 191, 191)';
          document.getElementById('prev').style.border = '1px solid rgb(191, 191, 191)';
          document.getElementById('next').style.color = 'rgb(191, 191, 191)';
          document.getElementById('next').style.border = '1px solid rgb(191, 191, 191)'; 
        } else {
          document.getElementById('prev').style.color = 'black';
          document.getElementById('prev').style.border = '1px solid black';
          document.getElementById('next').style.color = 'black';
          document.getElementById('next').style.border = '1px solid black';
        }
      } else if (a !== undefined && document.getElementById('next') === null) {
        setUrl(a.tracks.previous);
        console.log('Cannot access the last page because it is empty');
      }
    }
    settingBtnDisplay()
  }, [tracks])

  useEffect(() => {
    if (sessionStorage.getItem('info') === null || info === '') return 
    const gettingLyrics = async () => {
      const response = await fetch(`http://localhost:3001/lyrics?${info}`)
      const jsonResponse = await response.json()
      setLyircs(jsonResponse.lyrics)
    }
    gettingLyrics()
  }, [info])

  const apiSearch = async () => {
    if (search !== '') {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      })
      const responseJson = await response.json();
      console.log(responseJson.tracks);
      setcurrentPage(responseJson.tracks.offset / 20)
      setPages(Math.floor(responseJson.tracks.total / 20))
      return responseJson;
    }
  }

  const settingInf = () => { 
    setUri(sessionStorage.getItem('uri'))
    setInfo(sessionStorage.getItem('info'))
  }

  const settingSearch = async (e) => {
    setLyircs('');
    setInfo('')
    setSearch(e.target.value);
  }

  const next = async () => {
    const a = await apiSearch();
    if (a.tracks.next !== null) {
    setUrl(a.tracks.next);
    }
  }

  const prev = async () => {
    const a = await apiSearch();
    if (a.tracks.previous !== null) {
    setUrl(a.tracks.previous);
    }
  }

  return (
    <>
      <input id="se" placeholder="Search Song/Artist" onInput={settingSearch} autoComplete='off'/>
      
      {lyrics === '' ? <SongSearch tracks={tracks} settingInf={settingInf} next={next} prev={prev} pages={pages} currentPage={currentPage}/> : <Lyrics lyrics={lyrics} />}
      
      {uri.length !== 0 ? <SpotifyPlayer uris={uri ? [uri] : []} showSaveIcon token={accessToken} /> : null}
    </>
  )
}

export default Dashboard