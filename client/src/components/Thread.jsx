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
  const posts = useSelector(state => state.postReducer)
  const userData = useSelector(state => state.userReducer)
  const [followingPosts, setFollowingPosts] = useState([])

  let finalArr = []

  const filterPosts = async () => {
    await posts.map(post => {
      for (let i = 0; i < userData.following.length; i++) {
        if (
          post.posterId === userData.following[i] ||
          post.posterId === userData._id
        ) {
          finalArr.push(post)
          // console.log(finalArr)
        }
        setFollowingPosts(finalArr)
      }
      return null
    })
  }

  useEffect(() => {
    filterPosts()
  }, [posts, userData])

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
          posts.map(post => {
            if (post.posterId === userData._id) {
              return <Card post={post} key={post._id} />
            } else return null
          })}

        {/* {isProfilePage === false &&
          !isEmpty(posts[0]) &&
          posts.map(post => {
            return <Card post={post} key={post._id} />
          })} */}

        {isProfilePage === false &&
          !isEmpty(followingPosts[0]) &&
          followingPosts.map(post => {
            return <Card post={post} key={post._id} />
          })}

        {/* {isProfilePage === false &&
          !isEmpty(posts[0]) &&
          posts.map(post => {
            for (let i = 0; i < userData.following.length; i++) {
              if (
                post.posterId === userData.following[i] ||
                post.posterId === userData._id
              ) {
                return <Card post={post} key={post._id} />
              }
            }

            return null
          })} */}

        {/* {isProfilePage && !isEmpty(posts[0])
          ? posts.map(post => {
              if (post.posterId === userData._id) {
                return <Card post={post} key={post._id} />
              } else return null
            })
          : posts.map(post => {
              for (let i = 0; i <ul userData.following.length; i++) {
                if (
                  post.posterId === userData.following[i] ||
                  post.posterId === userData._id
                ) {
                  return <Card post={post} key={post._id} />
                }
              }
              return null
            })} */}
      </ul>
    </div>
  )
}

export default Thread
