import React from 'react'
import { useDispatch } from 'react-redux'
import { deletePost } from '../../actions/post.actions'

const DeleteButton = props => {
  const dispatch = useDispatch()

  const deleteQuote = () => dispatch(deletePost(props.id))

  return (
    <div
      onClick={() => {
        if (window.confirm('Are you sure you want to delete this post?')) {
          deleteQuote()
        }
      }}
    >
      <img src="./img/icons/trash.svg" alt="delete" />
    </div>
  )
}

export default DeleteButton
