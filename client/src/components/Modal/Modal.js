import React from 'react'
import './Modal.scss'

const Modal = (props) => {
console.log(props)
  // Elements in the modal are passed along as children since there is an opening and closing component
  // All these children have a key associated with them so you can write a function that return the element with that key 
  // This allows for complete flexibility if we want to add more Ui elements or rearrange what we have without affecting the structure
  const findByKey = (name) => 
    props.children.map(child => {
      if (child.key === name) return child
    })
  
  const closeModal = (e) => {
    // we need to stop the propagation to avoid the event bubbling up from the profile drop down
    e.stopPropagation()

    if (e.target.classList.contains('modal-close')) {
      // Click function is a simple function defined in nav that flipped the state of the modal
      return props.click()
    }
  }


  return (
    <div
      className="modal-mask modal-close"
      onClick={closeModal}
    >
      <div className="modal-wrapper">
        <div className="modal-container">
          <div className="modal-header">
            {findByKey('header')}
          </div>
          <div className="modal-body">
            {findByKey('body')}
          </div>

          <div className="modal-footer">
            <button
              className="modal-close"
              onClick={closeModal}
            >
              CLOSE
            </button>
            {findByKey('footer')}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
