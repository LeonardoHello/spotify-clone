const CLIENT_ID = '5cbba53ee72d441981c202e410cecc34';
const REDIRECT_URI = window.location.href;
const scope = 'streaming user-read-email user-read-private user-library-read user-library-modify user-read-playback-state user-modify-playback-state'.split(' ').join('%20');
const authUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=${scope}`

const Login = () => {  
  return (
    <a id="login" href={authUrl}>Login With Spotify</a>
  )
}

export default Login