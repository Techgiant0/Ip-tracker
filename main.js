const ipToggle = document.getElementById('ip')
const phoneToggle = document.getElementById('phone')
const ipInput = document.getElementsByClassName('ip-input-section')[0]
const phoneInput = document.getElementsByClassName('phone-input-section')[0]
const ipSection = document.querySelector('.ip-section')
const phoneSection = document.querySelector('.phone-section')

phoneToggle.addEventListener('click',()=>{
    phoneToggle.classList.add('selected')
    ipToggle.classList.remove('selected')
    ipInput.classList.add('hidden')
    phoneInput.classList.remove('hidden')
    ipSection.classList.add('hidden')
    phoneSection.classList.remove('hidden')
})

ipToggle.addEventListener('click',()=>{
    ipToggle.classList.add('selected')
    phoneToggle.classList.remove('selected')
    phoneInput.classList.add('hidden')
    ipInput.classList.remove('hidden')
    ipSection.classList.remove('hidden')
    phoneSection.classList.add('hidden')
})