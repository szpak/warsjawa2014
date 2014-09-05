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


(function header() {
    Template.header.attendeeName = function () {
        var attendee = Session.get('attendee');
        if (attendee !== null && attendee !== undefined) {
            return attendee.name;
        } else {
            return null;
        }
    };

    Template.header.events({
        'click #registration-button': function () {
            showRegistrationSection();
        },
        'click #log-out-button': function () {
            setLoadingIndicatorShown(true);

            Session.set('attendee', null);
            localStorage.removeItem('email');
            localStorage.removeItem('key');

            $('#header').find('#log-out-button').fadeOut('fast').delay(200).queue(function () {
                $('#registration-button').fadeIn('fast').dequeue();
            });
            $('#attendee-name').fadeOut('slow');

            Meteor.call('logout', function () {
                location.hash = "";
                setLoadingIndicatorShown(false);
            });
        }
    });
})();


(function registration() {
    var emailRequiredErrorMessage;

    Template.registration.hours = function () {
        return Session.get('hours');
    };
    Template.registration.minutes = function () {
        return Session.get('minutes');
    };
    Template.registration.seconds = function () {
        return Session.get('seconds');
    };

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
        var key = $('#registration #key-input').val();

        Meteor.call('register', name, email, key, function (error, result) {
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
                } else if (error.error === 'Cannot register yet.') {
                    var timeToWaitInSeconds = error.details.timeToWait / 1000;
                    var hours = Math.floor(timeToWaitInSeconds / 3600);
                    var minutes = Math.floor((timeToWaitInSeconds - hours * 3600) / 60);
                    var seconds = Math.floor(timeToWaitInSeconds - hours * 3600 - minutes * 60);

                    Session.set('hours', hours);
                    Session.set('minutes', minutes);
                    Session.set('seconds', seconds);

                    $('#registration-cant-register-yet-modal').foundation('reveal', 'open');
                } else {
                    $('#registration-error-modal').foundation('reveal', 'open');
                }
            }
        });
    }

    Template.registration.events({
        'keyup input, focus input, blur input, change input': function () {
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


(function login() {
    function login(email, key) {
        Meteor.call('login', email, key, function (error, result) {
            setLoadingIndicatorShown(false);
            if (result !== undefined) {
                Session.set('attendee', result);
                localStorage.setItem('email', result.email);
                localStorage.setItem('key', result.key);
                $('#header').find('#registration-button').fadeOut('fast').end().delay(200).queue(function () {
                    $('#log-out-button').fadeIn('fast').dequeue();
                });
                $('#attendee-name').fadeIn('slow');
            } else {
                if (error.error === 'Wrong attendee id or key.') {
                    $('#login-error-modal').foundation('reveal', 'open');
                } else {
                    $('#registration-error-modal').foundation('reveal', 'open');
                }
                localStorage.removeItem('email');
                localStorage.removeItem('key');
            }
        })
    }

    Template.login.rendered = function () {
        var hash = location.hash.split('/');
        if (hash.length === 3 && hash[0] === "#login") {
            (function () {
                setLoadingIndicatorShown(true);
                var email = hash[1];
                var key = hash[2];
                login(email, key);
            })();
        } else if (location.hash === "") {
            var email = localStorage.getItem('email');
            var key = localStorage.getItem('key');
            if (email !== null && email !== undefined && key !== null && key !== undefined) {
                login(email, key);
            }
        }
    };
})();
