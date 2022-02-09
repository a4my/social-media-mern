import axios from 'axios'

export const GET_USER = 'GET_USER'
export const UPLOAD_PICTURE = 'UPLOAD_PICTURE'
export const UPDATE_BIO = 'UPDATE_BIO'
export const UPDATE_CITY_DB = 'UPDATE_CITY_DB'
export const UPDATE_FROM_DB = 'UPDATE_FROM_DB'
export const UPDATE_JOB_DB = 'UPDATE_JOB_DB'
export const FOLLOW_USER = 'FOLLOW_USER'
export const UNFOLLOW_USER = 'UNFOLLOW_USER'

export const getUser = uid => {
  return dispatch => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/user/${uid}`)
      .then(res => {
        dispatch({ type: GET_USER, payload: res.data })
      })
      .catch(err => console.log(err))
  }
}

export const uploadPicture = (data, id) => {
  return dispatch => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}api/user/upload`, data)
      .then(res => {
        // console.log(data)
        return axios
          .get(`${process.env.REACT_APP_API_URL}api/user/${id}`)
          .then(res => {
            dispatch({ type: UPLOAD_PICTURE, payload: res.data.picture })
          })
      })
      .catch(err => console.log(err))
  }
}

export const updateBio = (userId, bio) => {
  return dispatch => {
    return axios({
      method: 'put',
      url: `${process.env.REACT_APP_API_URL}api/user/` + userId,
      data: { bio }
    })
      .then(res => {
        dispatch({ type: UPDATE_BIO, payload: bio })
      })
      .catch(err => console.log(err))
  }
}

export const updateCityDb = (userId, city) => {
  return dispatch => {
    return axios({
      method: 'put',
      url: `${process.env.REACT_APP_API_URL}api/user/city/` + userId,
      data: { city }
    })
      .then(res => {
        dispatch({ type: UPDATE_CITY_DB, payload: city })
      })
      .catch(err => console.log(err))
  }
}

export const updateFromDb = (userId, from) => {
  return dispatch => {
    return axios({
      method: 'put',
      url: `${process.env.REACT_APP_API_URL}api/user/from/` + userId,
      data: { from }
    })
      .then(res => {
        dispatch({ type: UPDATE_FROM_DB, payload: from })
      })
      .catch(err => console.log(err))
  }
}

export const updateJobDb = (userId, job) => {
  return dispatch => {
    return axios({
      method: 'put',
      url: `${process.env.REACT_APP_API_URL}api/user/job/` + userId,
      data: { job }
    })
      .then(res => {
        dispatch({ type: UPDATE_JOB_DB, payload: job })
      })
      .catch(err => console.log(err))
  }
}

export const followUser = (followerId, idToFollow) => {
  return dispatch => {
    return axios({
      method: 'patch',
      url: `${process.env.REACT_APP_API_URL}api/user/follow/` + followerId,
      data: { idToFollow }
    })
      .then(res => {
        dispatch({
          type: FOLLOW_USER,
          payload: { idToFollow }
        })
      })
      .catch(err => console.log(err))
  }
}

export const unfollowUser = (followerId, idToUnfollow) => {
  return dispatch => {
    return axios({
      method: 'patch',
      url: `${process.env.REACT_APP_API_URL}api/user/unfollow/` + followerId,
      data: { idToUnfollow }
    })
      .then(res => {
        dispatch({
          type: UNFOLLOW_USER,
          payload: { idToUnfollow }
        })
      })
      .catch(err => console.log(err))
  }
}
