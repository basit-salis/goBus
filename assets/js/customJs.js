// let searchBtn = document.querySelector('.search-btn');
let searchField = document.querySelector('#address');
// let seats = document.querySelector('#seat');
// console.log('field',searchField)

// ================ANIMATION=================
$(document).ready(function () {
    $('.slider').slick({
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: false
    });

    $('.aaa').slick({
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: false
    });

});
// // ==============@USER=====================

// // ==============@USER LOGGED IN===========
// function user(){
$(document).ready(function () {

    $('.bar').click(function () {
        $('.sidebar').toggleClass('hide');
        $('header, .home_row').toggleClass('slide-left');
    });
    $('barHome').click(function () {
        console.log('hello');
    });


});

// view seats
function viewSeats(from, destination, date, reportingTime, departureTime, tripId) {
    console.log(from,destination,date,reportingTime,departureTime,tripId);
    let displaySeat = (data) => {
        for (let i = 1; i < 21; i++) {
            HtmlData = `
            <div class="col-2 seat">
            <a href="./paymentSlip/:${i}" class="w-100 h-100"><button class="btn btn-primary w-100 h-100" >${i}</button></a>
            </div>
        `;
            let seatDB = i;

            for (let j = 0; j < data.length; j++) {
                if (data[j].seat_no === seatDB) {
                    HtmlData = `
                <div class="col-2 seat">
                <a href="#" class="w-100 h-100"><button class="btn btn-warning w-100 h-100" disabled>${i}</button></a>
                </div>
    
            `;
                }

            }
            document.querySelector('.seats_row').innerHTML += HtmlData;

        }

        $('#seats').toggleClass('show__seats');

    };

    $.ajax({
        type: 'GET',
        url: `/users/seats/:${tripId}`
    }).done(function (Data) {
        let data = Data.Data;
        console.log('seats',data);
        displaySeat(data);
    });

}

//auto_complete
const searchState = async searchText => {

    $.ajax({
        type: 'GET',
        url: '/users/search_scheduled_bus'
    }).done(function (Data) {
        let data = Data.Data;
        search(data);
    });

    function search(data) {
        const result = data;

        // text if matches anything in json..
        let matches = result.filter(match => {
            const regex = new RegExp(`^${searchText}`, 'gi');
            return match.start_point.match(regex);
        });

        if (searchText.length === 0) {
            matches = [];
        }
        outputHtml(matches);

    }
};
// 
// ==============display to DOM=========== 
const outputHtml = matches => {
    if (matches.length > 0) {
        const html = matches.map(match => `
        <table class="table table-striped table-inverse pt-3">

                 <tbody>
                     <tr id="search_result">
                     <td scope="row">${match.start_point}</td>
                     <td>${match.drop_point}</td>
                     <td scope="row">${match.travel_date}</td>
                     <td>
                     <a class='text-light' id='${match.trip_id}' onClick ="viewSeats('${match.start_point}','${match.drop_point}','${match.travel_date}','${match.start_time}','${match.start_time}','${match.trip_id}')">
                        <button class="btn btn-primary">
                        check seats availability
                        </button>
                     </a>
                     </td>
                     </tr>

                 </tbody>
             </table>
        `).join('');
        document.querySelector('.search-result').innerHTML = html;
    }
};

searchField.addEventListener('input', () => searchState(searchField.value));

function availableSeats() {

}
// }

// ==============ADMIN===========
// ==============CHART===========