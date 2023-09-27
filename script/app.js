const API_KEY = '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'
const submitButton = document.querySelector('#submit')
const outPutElement = document.querySelector('#output')
const inputElement = document.querySelector('input')
const historyElement = document.querySelector('.chat-history')

async function getMessage() {
    console.log('clicked')
   const options = {
       method: 'POST',
       headers: {
           'Authorization' : `Bearer ${API_KEY}`,
           'Content-Type' : 'application/json'
       },
       body: JSON.stringify({
           model: "gpt-3.5-turbo",
           messages: [{role: "user", content: inputElement.value}],
           max_tokens: 100
       })
   }

   try {
       const response = await fetch('https://api.openai.com/v1/chat/completions', options)
       const data = await response.json()
       console.log(data)
       outPutElement.textContent = data.choices[0].message.content

       if(data.choices[0].message.content) {
         const pElement = document.createElement('p')
         pElement.textContent = inputElement.value
         historyElement.append(pElement)
       }

   } catch (e) {
       console.log(e)
   }
}


submitButton.addEventListener('click', getMessage)

submitButton.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
      getMessage()
    }
  })