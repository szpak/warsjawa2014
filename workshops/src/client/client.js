console.log('client.js');

var pathnameElements = location.pathname.split('/');

loggedIn = false;


var spinner = undefined;
$(document).ready(function () {
    spinner = new Spinner().spin();
});
$(document).foundation({
    reveal: {
        close_on_background_click: false
    }
});
$(document).ready(function () {
    $(window).keydown(function (event) {
        if (event.keyCode == 13) {
            event.preventDefault();
            return false;
        }
    });
});

function setLoadingIndicatorShown(shown) {
    shown ? $('#loading-indicator').fadeIn('slow') : $('#loading-indicator').fadeOut('slow');
}

function showRegistrationSection() {
    location.hash = "registration";
    $('section#registration').show('slow');
}

if (pathnameElements.length === 4 && pathnameElements[1] === 'login') {
    var id = pathnameElements[2];
    var key = pathnameElements[3];
    console.log('id: ' + id);
    console.log('key: ' + key);

    Meteor.call('login', id, key, function (error, result) {
        console.log(error);
        console.log(result);
    });
}

Template.header.events({
    'click #registration-button': function () {
        showRegistrationSection();
    }
});

(function registration() {
    var emailRequiredErrorMessage;

    Template.registration.rendered = function () {
        emailRequiredErrorMessage = $('#email-input').parent().find('small').html();

        if (location.hash === "#registration") {
            showRegistrationSection();
        }
    };

    function validateForm() {
        function validateEmail(email) {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }

        var name = $('#registration #name-input').val();
        var email = $('#registration #email-input').val();
        return name.length > 0 && validateEmail(email);
    }

    function register() {
        setLoadingIndicatorShown(true);
        var name = $('#registration #name-input').val();
        var email = $('#registration #email-input').val();

        Meteor.call('register', name, email, function (error, result) {
            setLoadingIndicatorShown(false);
            if (result !== undefined) {
                location.hash = "";
                $('section#registration').hide('slow');
                $('#registration-finished-modal').foundation('reveal', 'open');
            } else {
                if (error.error === 'Email already taken.') {
                    var emailInput = $('#email-input');
                    emailInput.parent().find('small').html('This email is already taken.');
                    emailInput.addClass('error');
                    emailInput.parent().addClass('error')
                } else {
                    $('#registration-error-modal').foundation('reveal', 'open');
                }
            }
        });
    }

    Template.registration.events({
        'keyup input, focus input, blur input, change input': function () {
            console.log('input');
            var submitButton = $('#registration #submit-button');
            if (validateForm()) {
                submitButton.removeAttr('disabled');
                submitButton.removeClass('disabled');
            } else {
                submitButton.attr('disabled', 'disabled');
                submitButton.addClass('disabled');
            }
        },
        'change #email-input': function () {
            $('#email-input').parent().find('small').html(emailRequiredErrorMessage);
        },
        'click #submit-button': function () {
            if (validateForm()) {
                register();
            }
        },
        'keydown': function (event) {
            if (event.keyCode === 13 && validateForm()) {
                register();
            }
        }
    });
})();


var setLoggedInState = function (email, key) {
    loggedIn = true;
    $('section#header #registration-button').hide('slow');
    $('section#header #log-out-button').show('slow');
    localStorage.setItem('email', email);
    localStorage.setItem('key', key);
};

Template.confirmation.rendered = function () {
    if (pathnameElements.length > 3 && pathnameElements[1] === 'confirmation') {
        $('#confirmation-modal').foundation('reveal', 'open');
        var email = pathnameElements[2];
        var key = pathnameElements[3];
        Meteor.call('confirmation', email, key, function (error, result) {
            if (result === 'ok') {
                $('#confirmation-modal').foundation('reveal', 'close');
                setLoggedInState(email, key);
            }

            console.log(error);
            console.log(result);
        })
    }
};