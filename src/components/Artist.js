const Artist = ({ img, songName, artistName, uri, settingInf }) => {
  const changingInf = () => {
    sessionStorage.setItem('uri', uri);
    sessionStorage.setItem('info', `artist=${artistName.split(' ').join('%20')}&title=${songName.split(' ').join('%20')}`);
    settingInf()
  }

  return (
    <div onClick={changingInf} id="artist">
      <img src={img} alt="song cover" height='64px' width='64px'/>
      <ul>
        <li>{songName}</li>
        <li>{artistName}</li>
      </ul>
    </div>
  )
}

export default Artist