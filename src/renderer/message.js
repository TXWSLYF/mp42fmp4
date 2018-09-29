import '../css/message.css'

function Message () {}

function _createMessageElement (message) {
  let messageElement = document.createElement('div')
  messageElement.className = 'message-element'
  messageElement.innerText = message
  return messageElement
}

Message.prototype.success = function success (message) {
  let messageElement = _createMessageElement(message)
  messageElement.classList.add('message-element-success')
  let body = document.querySelector('body')
  body.appendChild(messageElement)
  setTimeout(() => {
    body.removeChild(messageElement)
  }, 2000);
}

Message.prototype.error = function error (message) {
  let messageElement = _createMessageElement(message)
  messageElement.classList.add('message-element-error')
  let body = document.querySelector('body')
  body.appendChild(messageElement)
  setTimeout(() => {
    body.removeChild(messageElement)
  }, 2000);
}

export default Message