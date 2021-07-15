let login = document.querySelector(".login_form");
    let user_name = document.querySelector('.username');
    let user_mail = document.querySelector('.usermail');
    let user_password = document.querySelector('.password');
    let form = document.querySelector('form');



    animatedForm()

    // form.addEventListener('submit', (e) => {
    //         e.preventDefault();

    //         let email = user_mail.value;
    //         let password = user_password.value;

    //         console.log(email,password);

    //         async function getting() {

    //             try {
    //                 const res = await fetch('/login', {
    //                     method: 'POST',
    //                     body: JSON.stringify({
    //                         email,
    //                         password
    //                     }),
    //                     headers: {
    //                         'Content-Type': 'application/json'
    //                     }
    //                 });
                  
    //             }
    //              catch (err) {
    //                 console.log('err:', err)
    //                 console.log('error from catch');

    //             }
    //         }
    //         getting();
    //     });
 



    function animatedForm() {
        const arrows = document.querySelectorAll('.fa-arrow-down');
        arrows.forEach(arrow => {
            arrow.addEventListener('click', () => {
                const input = arrow.previousElementSibling;
                const parent = arrow.parentElement;
                const nextform = parent.nextElementSibling;

                console.log(input);
                console.log(parent);
                console.log(nextform);

                let attempt = 3;
                if (input.type === 'email' && validateEmail(input)) {
                    nextslide(parent, nextform);
                } else if (input.type === 'password' && validatePassword(input)) {
                    nextslide(parent, nextform);
                }
            })
        });
    }

    function validateEmail(email) {
        if (typeof email.value == 'string') {
            success(' rgba(12, 75, 31, 0.623)');
            return true;
        } else {
            error('rgba(201, 48, 48, 0.623)');
        }
    }

    function validatePassword(password) {
        if (password.value.length >= 6) {
            success('rgba(12, 75, 31, 0.623)');
            return true;
        } else {
            error('rgba(201, 48, 48, 0.623)');
        }
    }

    function nextslide(parent, nextform) {
        parent.classList.add('inactive');
        parent.classList.remove('active');
        nextform.classList.add('active');
    }

    function error(color) {
        document.querySelector('.login_form').style.backgroundColor = color;
    }

    function success(color) {
        document.querySelector('.login_form').style.backgroundColor = color;
    }
