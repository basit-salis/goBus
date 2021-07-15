// let searchBtn = document.querySelector('.search-btn');
let searchField = document.querySelector('#address');
// let seats = document.querySelector('#seat');
// console.log('field',searchField)

// ================ANIMATION=================
$(document).ready(function(){
    $('.slider').slick({
       infinite: true,
       speed: 500,
       fade: true,
       cssEase:'linear',
       autoplay: true,
        autoplaySpeed:5000,
        arrows: false
    });

    $('.aaa').slick({
       infinite: true,
       speed: 500,
       fade: true,
       cssEase:'linear',
       autoplay: true,
        autoplaySpeed:5000,
        arrows: false
    });

});
// // ==============@USER=====================

// // ==============@USER LOGGED IN===========
// function user(){
$(document).ready(function () {
    let barhome = document.querySelector('.bars');
    let navbar = document.querySelector('.navbar');
    let seatContainer = document.querySelector('.seat__container');
    $('.bar').click(function () {
        $('.sidebar').toggleClass('hide')
        $('header, .home_row').toggleClass('slide-left');
    });
    $('barHome').click(function () {
       console.log('hello');
    });

  
});
function funcSeat () {
    $('.seat__container').toggleClass('show__seats');
 };

//auto_complete
const searchState = async searchText => {

    const res = await fetch('../assets/search_auto.json');
    const result = await res.json();

    // text if matches anything in json..
    let matches = result.filter(match => {
        const regex = new RegExp(`^${searchText}`, 'gi');
        return match.from.match(regex);
    });

    if (searchText.length === 0) {
        matches = [];
    }
    outputHtml(matches);

};

// ==============display to DOM=========== 
const outputHtml = matches => {
    if (matches.length > 0) {
        const html = matches.map(match => `
        <table class="table table-striped table-inverse pt-3">

                 <tbody>
                     <tr id="search_result">
                     <td scope="row">${match.from}</td>
                     <td>${match.destination}</td>
                     <td scope="row">${match.date}</td>
                     <td><button class="btn btn-primary" id='book' onClick = "funcSeat()"><a class='text-light'>check seats availability</a></button></td>
                     </tr>

                 </tbody>
             </table>
        `).join('');
        document.querySelector('.search-result').innerHTML = html;
    }
};

searchField.addEventListener('input', () => searchState(searchField.value));

function availableSeats(){

}
// }

// ==============ADMIN===========
// ==============CHART===========



