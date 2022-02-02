import { GET_POSTS, LIKE_UNLIKE_POST } from '../actions/post.actions'

const initialState = {}

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return action.payload
    case LIKE_UNLIKE_POST:
      return state.map(post => {
        if (post._id === action.payload.postId) {
          if (!post.likers.includes(action.payload.userId)) {
            return {
              ...post,
              likers: [action.payload.userId, ...post.likers]
            }
          } else {
            return {
              ...post,
              likers: post.likers.filter(id => id !== action.payload.userId)
            }
          }
        }
        return post
      })
    default:
      return state
  }
}
