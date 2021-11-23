const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const messageFour = document.querySelector('#message-4')

// messageOne.textContent = 'from java'

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const location = search.value
  messageOne.textContent = 'loading'
  messageTwo.textContent = ""
  messageThree.textContent = ""
  messageFour.textContent = ""
  fetch("/weather?address=" + encodeURIComponent(location)).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageTwo.textContent='error'
      } else {
        messageOne.textContent = data.location
        messageTwo.textContent = "temp: " + data.temp
        messageThree.textContent = "wind speed: " + data.wind
        messageFour.textContent = "feels like: " + data.feels
      }
    })
  })
})