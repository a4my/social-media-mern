import { GET_ALL_POSTS } from '../actions/post.actions'
// import { GET_USER_POSTS } from '../actions/post.actions'

const initialState = {}

export default function allPostsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_POSTS:
      return action.payload
    // case GET_USER_POSTS:
    //   return state.map(post => {
    //     if (post.posterId === action.payload.userId) {
    //       return {
    //         ...post
    //       }
    //     }
    //   })
    default:
      return state
  }
}
