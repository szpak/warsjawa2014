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

function showSpinnerOnElement(id) {
    $(id).append(spinner.el);
}

function showRegistrationSection() {
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

function register(name, email) {
    Meteor.call('register', name, email, function (error, result) {
        spinner.stop();
        if (result === 'ok') {
            $('section#registration').hide('slow');
            $('#registration-modal').foundation('reveal', 'open');
        } else {
            console.log(error);
        }
    });
}

Template.registration.events({
    'keyup input': function () {
        var name = $('#registration #name-input').val();
        var email = $('#registration #email-input').val();
        var submitButton = $('#registration #submit-button');
        if (name.length > 0 && email.length > 0) {
            submitButton.removeAttr('disabled');
            submitButton.removeClass('disabled');
        } else {
            submitButton.attr('disabled', 'disabled');
            submitButton.addClass('disabled');
        }
    },
    'click #submit-button': function () {
        var name = $('#registration #name-input').val();
        var email = $('#registration #email-input').val();

        showSpinnerOnElement('section#registration');
        register(name, email);
    },
    'keydown': function (event) {
        if (event.keyCode === 13 && !$('#registration #submit-button').hasClass('disabled')) {
            var name = $('#registration #name-input').val();
            var email = $('#registration #email-input').val();
            register(name, email);
            console.log('keydown');
        }
    }
});

Template.registration.rendered = function () {
    if (pathnameElements.length > 1 && pathnameElements[1] === 'registration') {
        showRegistrationSection();
    }
};

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