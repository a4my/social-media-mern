import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from '../actions/post.actions'
import Card from './Post/Card'
import { isEmpty } from './utils'

const Thread = props => {
  const [isProfilePage] = useState(props.isProfilePage)
  const [loadPost, setLoadPost] = useState(true)
  const [count, setCount] = useState(5)
  const dispatch = useDispatch()
  const posts = useSelector(state => state.allPostsReducer)
  const userData = useSelector(state => state.userReducer)
  const [followingPosts, setFollowingPosts] = useState([])
  const [profilePosts, setProfilePosts] = useState([])

  let finalArr = []
  let finalUserPosts = []

  const filterUserPosts = async () => {
    if (!isEmpty(posts)) {
      await posts.map(post => {
        if (post.posterId === userData._id) {
          finalUserPosts.push(post)
        }
        setProfilePosts(finalUserPosts)
        return post
      })
    }
  }

  const filterPosts = async () => {
    if (!isEmpty(posts)) {
      await posts.map(post => {
        for (let i = 0; i < userData.following.length; i++) {
          if (
            post.posterId === userData.following[i]
            // post.posterId === userData._id
          ) {
            finalArr.push(post)
          }
        }
        if (
          // post.posterId === userData.following[i]
          post.posterId === userData._id
        ) {
          finalArr.push(post)
        }
        setFollowingPosts(finalArr)
        return post
      })
    }
  }

  useEffect(() => {
    if (isProfilePage) {
      filterUserPosts()
    } else {
      filterPosts()
    }
  }, [posts, userData, isProfilePage])

  // useEffect(() => {
  //   filterPosts()
  // }, [posts, userData])

  const loadMore = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >
      document.scrollingElement.scrollHeight
    ) {
      setLoadPost(true)
    }
  }

  useEffect(() => {
    if (loadPost) {
      dispatch(getPosts(count))
      setLoadPost(false)
      setCount(count + 5)
    }

    window.addEventListener('scroll', loadMore)
    return () => window.removeEventListener('scroll', loadMore)
  }, [loadPost, dispatch, count, posts, userData])

  return (
    <div className="thread-container">
      <ul>
        {/* Original code */}
        {/* {!isEmpty(posts[0]) &&
          posts.map(post => {
            return <Card post={post} key={post._id} />
          })} */}

        {isProfilePage &&
          !isEmpty(posts[0]) &&
          profilePosts.map(post => {
            return <Card post={post} key={post._id} />
          })}

        {isProfilePage === false &&
          !isEmpty(followingPosts[0]) &&
          followingPosts.map(post => {
            return <Card post={post} key={post._id} />
          })}
      </ul>
    </div>
  )
}

export default Thread
