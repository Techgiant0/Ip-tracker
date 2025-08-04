const ipToggle = document.getElementById('ip')
const phoneToggle = document.getElementById('phone')
const ipInputSection = document.getElementsByClassName('ip-input-section')[0]
const phoneInputSection = document.getElementsByClassName('phone-input-section')[0]
const ipSection = document.querySelector('.ip-section')
const phoneSection = document.querySelector('.phone-section')
let map
let mapContainer = document.getElementById('map-section')
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
let loader = document.getElementById('loader-section')
let infosec = document.getElementById('infosec')
let ipBtn = document.getElementById('track')
let phoneBtn = document.getElementById('track-phone')
let alertBox = document.getElementById('alert')
let phoneNum = document.getElementById('phone-number')
let localNum = document.getElementById('local-number')
let numCountry = document.getElementById('numCountry')
let userLocation = document.getElementById('location')
let type = document.getElementById('type')
let carrier = document.getElementById('carrier')
let numPrompt = document.getElementById('phone-number-prompt')
let show = document.getElementById('show')

phoneToggle.addEventListener('click',()=>{
    phoneToggle.classList.add('selected')
    ipToggle.classList.remove('selected')
    ipInputSection.classList.add('hidden')
    phoneInputSection.classList.remove('hidden')
    ipSection.classList.add('hidden')
    phoneSection.classList.remove('hidden')
    mapContainer.classList.add('hidden')
})

ipToggle.addEventListener('click',()=>{
    ipToggle.classList.add('selected')
    phoneToggle.classList.remove('selected')
    phoneInputSection.classList.add('hidden')
    ipInputSection.classList.remove('hidden')
    ipSection.classList.remove('hidden')
    phoneSection.classList.add('hidden')
    mapContainer.classList.remove('hidden')
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
    country.textContent = data.country_name;
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

function showLoadingState(){
    loader.style.display = 'flex'
    infosec.classList.add('hidden')
}

function hideLoadingState(){
    loader.style.display = 'none'
    infosec.classList.remove('hidden')
}

document.addEventListener('DOMContentLoaded', async () => {
  const isDev = false; // Set to true if you want to use the mock data
  let apiUrl

   if (!isDev) {
        devMode.style.display = 'none';
        apiUrl = `https://ipapi.co/json/`;
    } else {
        devMode.style.display = 'block';
        apiUrl = `./mock-api-response.json`;
    }

  showLoadingState()
  try {
    const response = await fetch(apiUrl);
    if(!response.ok){
        throw new Error(`HTTP error status: ${response.status}`)
    }
    const data = await response.json()

    const lat = data.latitude;
    const lon = data.longitude;

    // Initialize map only once
    if (!map) {
      map = L.map('map').setView([lat, lon], 13);

      // Add OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);
    }

    // Add marker
    L.marker([lat, lon])
      .addTo(map)
      .bindPopup(`You're here: ${data.city}, ${data.country_name}`)
      .openPopup();

    // Display the rest of your data on the page
    updatePageWithData(data);
    hideLoadingState()
  } catch (error) {
    console.error('Error loading IP data:', error);
  }
});

ipBtn.addEventListener('click', async () => {
    
    const searchIp = ipInput.value
    const ipAddress = searchIp.trim()
    if(!ipAddress){
        alertBox.textContent = 'Please enter a valid IP Address to search'
        alertBox.style.display = 'block'
        setTimeout(function() {
            alertBox.style.display = 'none';
        }, 5000);
        return
    }

    showLoadingState()

    try {
        const response = await fetch(`https://ipapi.co/${ipAddress}/json/`)
        if(response.status === 404){
            alertBox.textContent = 'IP Address Not Found ☹️'
            alertBox.style.display = 'block'
            setTimeout(function() {
                alertBox.style.display = 'none';
            }, 5000);
            return
        }else if(!response.ok){
            console.log(`There was an error: ${response.status}`)
            return
        }

        const data = await response.json()
        if(data.error){
            alertBox.textContent = `You can't access ${data.ip}, ☹️. Reason: ${data.reason}`
            alertBox.style.display = 'block'
            setTimeout(function() {
                alertBox.style.display = 'none';
            }, 5000);
            return
        }
        console.log(data)
        const lat = data.latitude;
        const lon = data.longitude;

        // Initialize map only once
        if (!map) {
        map = L.map('map').setView([lat, lon], 13);

        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);
        }

        // Add marker
        L.marker([lat, lon])
        .addTo(map)
        .bindPopup(`You're here: ${data.city}, ${data.country_name}`)
        .openPopup();

        updatePageWithData(data)
        hideLoadingState()
    } catch (error) {
        console.error(`Error description: ${error}`)
    }finally{
        hideLoadingState()
    }
})

phoneBtn.addEventListener('click', async()=>{
    let isDev = false
    let apiUrl

    let phoneNumber = phoneInput.value
    let phoneNumberTrim = phoneNumber.trim()
    if(!phoneNumberTrim){
        alertBox.textContent = 'Please enter a valid Phone Number to search'
        alertBox.style.display = 'block'
        setTimeout(function() {
            alertBox.style.display = 'none';
        }, 5000);
        return
    }

     if (!isDev) {
        devMode.style.display = 'none';
        apiUrl = `https://phonevalidation.abstractapi.com/v1/?api_key=4bdae271e60a4604b7afe511adf8194d&phone=${phoneNumberTrim}`;
    } else {
        devMode.style.display = 'block';
        apiUrl = `./mock phone num response.json`;
    }

    showLoadingState()

    try {
        const response = await fetch(apiUrl)
         if(response.status === 404){
            alertBox.textContent = 'Phone Number Not Found ☹️'
            alertBox.style.display = 'block'
            setTimeout(function() {
                alertBox.style.display = 'none';
            }, 5000);
            return
        }else if(!response.ok){
            console.log(`There was an error: ${response.status}`)
            return
        }

        const data = await response.json()

        phoneNum.textContent = data.format.international
        localNum.textContent = data.format.local
        numCountry.textContent = data.country.name
        userLocation.textContent = data.location 
        type.textContent = data.type
        carrier.textContent = data.carrier
        
        numPrompt.style.display = 'none'
        show.style.display = 'flex'
    } catch (error) {
        console.error(`An error ocuured. Error Info: ${error}`)
    }finally{
        hideLoadingState()
    }
})