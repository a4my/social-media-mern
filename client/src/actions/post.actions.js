import axios from 'axios'

// posts
export const GET_POSTS = 'GET_POSTS'
export const LIKE_UNLIKE_POST = 'LIKE_UNLIKE_POST'

export const getPosts = num => {
  return dispatch => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/post/`)
      .then(res => {
        const array = res.data.slice(0, num)
        dispatch({ type: GET_POSTS, payload: array })
      })
      .catch(err => console.log(err))
  }
}

export const likeUnlikePost = (postId, userId) => {
  return dispatch => {
    return axios({
      method: 'put',
      url: `${process.env.REACT_APP_API_URL}api/post/` + postId + '/like',
      data: { id: userId }
    })
      .then(res => {
        dispatch({ type: LIKE_UNLIKE_POST, payload: { postId, userId } })
      })
      .catch(err => console.log(err))
  }
}
