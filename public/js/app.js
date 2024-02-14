const form = document.querySelector('form')
const url = document.querySelector('#yt-url')
const h1 = document.querySelector('#h1')
const h2 = document.querySelector('#h2')
const m1 = document.querySelector('#m1')
const m2 = document.querySelector('#m2')
const s1 = document.querySelector('#s1')
const s2 = document.querySelector('#s2')
const second = document.querySelector('#second')
const message = document.querySelector('#message')
const button = document.querySelector('#send')
const numInputs = document.querySelectorAll('input[type=number].unit')

numInputs.forEach(function(input) {
    input.addEventListener('change', function(e) {
        if (e.target.value == '') {
            e.target.value = 0
        }
    })
})

form.addEventListener('submit', (e) => {
    e.preventDefault()

    message.textContent = 'Loading...'

    if (url.value) {
        button.disabled = true

        const body = {
            url: url.value,
            hhmmss: [h1.value, h2.value, m1.value, m2.value, s1.value, s2.value],
            second: second.value
        }

        fetch('/yt/download', {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(body)
        }).then((data) => {
            if (data.status !== 200) {
                message.textContent = 'Server Error! Check your URL or try another URL!'
            } else {
                message.textContent = 'Successfully Converted!'
            }
            url.value = ''
            url.focus()
            button.disabled = false
        }).catch((e) => {
            message.textContent = 'Submit Error!'
            console.log(e)
            button.disabled = false
        })
    } else {
        message.textContent = 'Empty Input!'
    }

})