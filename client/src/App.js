import React, { useEffect, useState } from 'react'
import './styles/index.scss'
import Layout from './components/layout/Layout'
import { UidContext } from './components/layout/AppContext'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { getUser } from './actions/user.actions'

export default function App() {
  const [uid, setUid] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true
      })
        .then(res => {
          setUid(res.data)
        })
        .catch(err => console.log('No token'))
    }
    fetchToken()

    if (uid) dispatch(getUser(uid))
  }, [uid, dispatch])

  return (
    <UidContext.Provider value={uid}>
      <Layout />
    </UidContext.Provider>
  )
}
