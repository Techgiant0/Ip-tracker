const ipToggle = document.getElementById('ip')
const phoneToggle = document.getElementById('phone')
const ipInputSection = document.getElementsByClassName('ip-input-section')[0]
const phoneInputSection = document.getElementsByClassName('phone-input-section')[0]
const ipSection = document.querySelector('.ip-section')
const phoneSection = document.querySelector('.phone-section')
const map = document.getElementsByClassName('map-section')[0]
const lessInfo = document.getElementById('less-info')
const moreInfo = document.getElementById('more-info')
const grp = document.getElementById('grp2')
const ipInput = document.getElementById('ip-input')
const phoneInput = document.getElementById('phone-input')
const devMode = document.getElementById('devMode')
let ip = document.getElementById('ip-address')
let city = document.getElementById('city')
let country = document.getElementById('country')
let timezone = document.getElementById('timezone')
let latitude = document.getElementById('lat')
let longitude = document.getElementById('long')
let organisation = document.getElementById('org')
let version = document.getElementById('version')
let capital = document.getElementById('capital')
let network = document.getElementById('network')
let asn = document.getElementById('asn')
let currency = document.getElementById('currency')

phoneToggle.addEventListener('click',()=>{
    phoneToggle.classList.add('selected')
    ipToggle.classList.remove('selected')
    ipInputSection.classList.add('hidden')
    phoneInputSection.classList.remove('hidden')
    ipSection.classList.add('hidden')
    phoneSection.classList.remove('hidden')
    map.classList.add('hidden')
})

ipToggle.addEventListener('click',()=>{
    ipToggle.classList.add('selected')
    phoneToggle.classList.remove('selected')
    phoneInputSection.classList.add('hidden')
    ipInputSection.classList.remove('hidden')
    ipSection.classList.remove('hidden')
    phoneSection.classList.add('hidden')
    map.classList.remove('hidden')
})

if(window.innerWidth <= 768){
    moreInfo.addEventListener('click', ()=>{
        grp.style.display = 'flex'
        moreInfo.classList.add('hidden')
        lessInfo.classList.remove('hidden')
    })

    lessInfo.addEventListener('click', ()=>{
        grp.style.display = 'none'
        moreInfo.classList.remove('hidden')
        lessInfo.classList.add('hidden')
    })
}

function updatePageWithData(data) {
    ip.textContent = data.ip;
    city.textContent = data.city;
    country.textContent = data.country;
    asn.textContent = data.asn;
    latitude.textContent = data.latitude;
    longitude.textContent = data.longitude;
    organisation.textContent = data.org;
    capital.textContent = data.country_capital;
    version.textContent = data.version;
    timezone.textContent = data.timezone;
    network.textContent = data.network;
    currency.textContent = data.currency_name;
}

document.addEventListener('DOMContentLoaded', async () => {
    const isDev = false;
    let apiUrl;

    if (!isDev) {
        devMode.style.display = 'none';
        apiUrl = `https://ipapi.co/json/`;
    } else {
        devMode.style.display = 'block';
        apiUrl = `./mock-api-response.json`;
    }

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        updatePageWithData(data);

    } catch (error) {
        console.error(error);
    }
});