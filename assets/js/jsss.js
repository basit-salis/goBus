let long;
let lat;
let Country = document.querySelector(".country");
let search_result = document.querySelector('.search_result');
let search_button = document.querySelector('.search_button');
let Temp = document.querySelector('.temp');
let temperatureDesc =document.querySelector('.desc');
let weatherProp = document.querySelectorAll(".weather_prop p span");
let Icon = document.querySelector('.icon');
let map_row = document.querySelectorAll('.map_row h5');
let City = document.querySelector('weather_desc h2');
let locationTimezone = document.querySelector('.location-timezone');
let temperatureSection = document.querySelector('temperature-section');
let temperatureSpan = document.querySelector('temperature-section span');
let sidebar_item = document.querySelector('.weather_condition li');
let arr = document.querySelectorAll('.fa-angle-right');
// let location =search_result.value;



// let ddd = function doomed(){
//     document.querySelector('#dropitem').classList.toggle('show');
// }

// window.onclick = function(event){
//     if(!event.target.matches('.dropbtn')){
//         let dropdowns = document.querySelector('.mydrop');
//         let i;
//         for(i = 0; i< dropdown.lenght; i++){
//             let openDropdown = dropdowns[i];
//             if (openDropdown.classList.contains('show')){
//                 openDropdown.classList.remove('show');
//             }
//         }
//     }
// }

sidebar_item.addEventListener('click',()=>{
    arr.forEach(ar=>{
            ar.classList.remove('fa-angle-right')
            ar.classList.add('fa-angle-down')
    })

})

date = new Date()
let hr = date.getHours();
let min = date.getMinutes();
let sec = date.getSeconds();
let month = date.getMonth();
let day = date.getDay();
console.log(date);
console.log(`${hr}:${min}:${sec}: ${month}: ${day}`);




//get api
class Api{
    async  getApi(){
        try{
           
            //  search_button.addEventListener('click', () =>{
    const api = `https://api.openweathermap.org/data/2.5/weather?q=london&appid=7762ea0b12151e2dfeb44baa56c5b5f8`;
            let response = await fetch(api);
            let result = await response.json();
            let products = result.data;
            console.log(`api object:: ${products}`);
            
            // products = products.map( item =>{
            //     const{country,sunrise,sunset} = sys;
            //     const city = data.name;
            //     const{feels_like,humidity,pressure,temp,temp_max,temp_min} = main;
            //     console.log(city,feels_like);
        
            //     const{main,description,icon} = weather[0];
            //     const windSpeed = wind.speed;
            //     const props = [feels_like,humidity,pressure,windSpeed,sunrise,sunset]
            //     const sun_moon = [sunrise,sunset,moonrise,moonset];
// });
            // });

            return products;

        } catch (error){
            console.log(error);
        }
    }

}

Api();


//updating ui
class UI{}

//storage
class Storage{}




// search_button.addEventListener('click', () =>{
//     let location = search_result.value;
// console.log(location)
//    const api = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=7762ea0b12151e2dfeb44baa56c5b5f8`

//      fetch(api)
//     .then(response =>{
//         return response.json()
//     })
//     .then(data => {
//         console.log('hello');
//         console.log(data);
//         const{country,sunrise,sunset} = data.sys;
//         const city = data.name;
//         const{feels_like,humidity,pressure,temp,temp_max,temp_min} = data.main;
//         console.log(city,feels_like);

//         const{main,description,icon} = data.weather[0];
//         const windSpeed = data.wind.speed;
//         const props = [feels_like,humidity,pressure,windSpeed,sunrise,sunset]
//         const sun_moon = [sunrise,sunset,moonrise,moonset];

    // for (let i = 0; i < props.length; i++){
    //     weatherProp[i].textContent = props[i].toFixed(2)
    //     if(i = 2){
    //         map_row[i].textContent =sunrise; 
    //     }
    // }


    // main in use
    // let iconURL = `http://openweathermap.org/img/w/${icon}.png`
    // Icon.innerHTML = `<img class='ICON' src = "${iconURL}">`
    // country.textContent = country;
    // Temp.textContent = temp;
    // temperatureDesc.textContent = description;

    // setIcons(icon, document.querySelector('.icon'));
    //end here
// })
// .catch( error =>alert()) 




// })


function setIcons(icon,iconID){
const skycons = new Skycons({color:'white'});
// this replace every - in icon with _and .uppercase change icon letter to uppercase since the skycons are block letters....
const currentIcon = icon.replace(/-/g,'_').toUpperCase()
skycons.play();
return skycons.set(iconID, Skycons[currentIcon]);
}





var icons = new Skycons({color:'white'}),
list  = [
  "clear-day", "clear-night", "partly-cloudy-day",
  "partly-cloudy-night", "cloudy", "rain", "sleet", "snow", "wind",
  "fog"
],
i;

for(i = list.length; i--; )
icons.set(list[i], list[i]);

icons.play();