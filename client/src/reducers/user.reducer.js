import {
  FOLLOW_USER,
  GET_USER,
  UNFOLLOW_USER,
  UPDATE_BIO,
  UPDATE_CITY_DB,
  UPDATE_FROM_DB,
  UPDATE_JOB_DB,
  UPLOAD_PICTURE
} from '../actions/user.actions'

const initialState = {}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return action.payload
    case UPLOAD_PICTURE:
      return {
        ...state,
        picture: action.payload
      }
    case UPDATE_BIO:
      return {
        ...state,
        bio: action.payload
      }
    case UPDATE_CITY_DB:
      return {
        ...state,
        city: action.payload
      }
    case UPDATE_FROM_DB:
      return {
        ...state,
        from: action.payload
      }
    case UPDATE_JOB_DB:
      return {
        ...state,
        job: action.payload
      }
    case FOLLOW_USER:
      return {
        ...state,
        following: [action.payload.idToFollow, ...state.following]
      }
    case UNFOLLOW_USER:
      return {
        ...state,
        following: state.following.filter(
          id => id !== action.payload.idToUnfollow
        )
      }
    default:
      return state
  }
}
