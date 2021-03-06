import { useState, useEffect } from "react"
import axios from 'axios'

const useAuth = (code) => {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  useEffect(() => {
    axios.get(`/login?code=${code}`)
    .then(res => {
      setAccessToken(res.data.accessToken);
      setRefreshToken(res.data.refreshToken);
      setExpiresIn(res.data.expiresIn);
    })
    .catch((err) => console.log(err))
  }, [code])

  useEffect(() => {
    if (!refreshToken || !expiresIn) return
    const interval = setInterval(() => {
      if (refreshToken !== undefined) {
        axios.get(`/refresh?refresh_token=${refreshToken}`)
        .then(res => {
          setAccessToken(res.data.accessToken);
          setExpiresIn(res.data.expiresIn);
        })
        .catch((err) => console.log(err))
      }
    }, (expiresIn - 60) * 1000)
    return () => clearTimeout(interval)
  }, [refreshToken, expiresIn])
  
  return accessToken
}

export default useAuth