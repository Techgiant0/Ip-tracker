const ipToggle = document.getElementById('ip')
const phoneToggle = document.getElementById('phone')
const ipInput = document.getElementsByClassName('ip-input-section')[0]
const phoneInput = document.getElementsByClassName('phone-input-section')[0]
const ipSection = document.querySelector('.ip-section')
const phoneSection = document.querySelector('.phone-section')
const map = document.getElementsByClassName('map-section')[0]
const lessInfo = document.getElementById('less-info')
const moreInfo = document.getElementById('more-info')
const grp = document.getElementById('grp2')

phoneToggle.addEventListener('click',()=>{
    phoneToggle.classList.add('selected')
    ipToggle.classList.remove('selected')
    ipInput.classList.add('hidden')
    phoneInput.classList.remove('hidden')
    ipSection.classList.add('hidden')
    phoneSection.classList.remove('hidden')
    map.classList.add('hidden')
})

ipToggle.addEventListener('click',()=>{
    ipToggle.classList.add('selected')
    phoneToggle.classList.remove('selected')
    phoneInput.classList.add('hidden')
    ipInput.classList.remove('hidden')
    ipSection.classList.remove('hidden')
    phoneSection.classList.add('hidden')
    map.classList.remove('hidden')
})

moreInfo.addEventListener('click', ()=>{
    grp.classList.remove('hidden')
    moreInfo.classList.add('hidden')
    lessInfo.classList.remove('hidden')
})

lessInfo.addEventListener('click', ()=>{
    grp.classList.add('hidden')
    moreInfo.classList.remove('hidden')
    lessInfo.classList.add('hidden')
})