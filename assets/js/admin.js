// ==============DISPLAY NAV-ITEM @ADMIN===========

let buses = document.querySelector('#buses');
let test = document.querySelector('.test');
let navItem = [...document.querySelectorAll('.nav__drop__item')];
console.log(navItem)


navItem.forEach(item => {
    let contentText = item.textContent;
    // console.log(contentText)
    switch (contentText) {
        case 'new':
            item.addEventListener('click', () => {
                let info = ({
                    url: '/admin/message-new',
                    id: document.querySelector('#message-new')
                });
                getItems(info);

            });
            break;

        case 'inbox':
            item.addEventListener('click', () => {
                let info = ({
                    url: '/admin/message-inbox',
                    id: document.querySelector('#message-inbox')
                });
                getItems(info);

            });
            break;

        case 'sent':
            item.addEventListener('click', () => {
                let info = ({
                    url: '/admin/message-sent',
                    id: document.querySelector('#message-sent')
                });
                getItems(info);

            });
            break;
        default:
            break;

    }
});

function getItems(info) {
    // console.log(info.id);
    let page__id = info.id;
    let page__url = info.url;
    console.log('imed func', page__id, page__url);


    let requestPage;

    function makeRequest() {

        requestPage = new XMLHttpRequest();
        if (!requestPage) {
            console.log('error in request');
            return false;
        }
        requestPage.onreadystatechange = viewBuses;
        console.log('request', page__url);
        requestPage.open('GET', page__url);
        requestPage.send();

    }
    makeRequest();

    function viewBuses() {
        try {
            if (requestPage.readyState === XMLHttpRequest.DONE) {
                console.log(requestPage.status);
                if (requestPage.status === 200) {
                    let page__content = requestPage.responseText;
                    test.innerHTML = page__content;
                } else {
                    console.log('error');
                }
            }
        } catch (error) {
            console.log('error from cact');

        }

    }

}




    // schedulle
//     let delBtn =[...document.querySelectorAll('.del__btn')];
//     // console.log('btn',delBtn)


// delBtn.forEach(btn => {
    
//     // BusID = btn.getAttribute('id');
//     // console.log('btn',BusID)
//     $('btn').on("click", function(e){
//     BusID = e.target.id;

//         console.log(BusID);
//         const ID = {
//             BusID
//         };
//         const stringifyID = JSON.stringify(ID);
//         $.ajax({
//             type:'POST', 
//             url:'/admin/buses/:id',
//             success: function(ID){
//                 alert('bus removed');
//             }
//         })
//     })
// });

// });



// ==============SAVE BUSES @ADMIN===========
// console.log(document.querySelector('#save__bus'))
// .addEventListener('click', ()=> console.log('saved bus'))