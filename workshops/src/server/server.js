var host = 'http://warsjawa.pl:8181';
var timeout = 5000;

Meteor.methods({
    register: function (name, email) {
        console.log('[' + email + '] registering attendee: ' + name);
        var attendee = Attendees.findOne({_id: email});
        if (attendee === undefined) {
            console.log('[' + email + '] attendee not found. Registering him/her with Warsjawa backend.');
            var response = HTTP.call('POST', host + '/users', {timeout: timeout, data: {email: email, firstName: name, lastName: 'NOT USED!'}});
            if (response.statusCode === 201) {
                console.log('[' + email + '] registering with Warsjawa backend complete. Adding to db.');
                attendee = Attendees.insert({_id: email, email: email, name: name, key: null});
                return attendee;
            } else {
                console.log('[' + email + '] Warsjawa backend returned status code: ' + response.statusCode + ' abandon thread.');
                throw new Meteor.Error('Something wrong with Warsjawa backend.');
            }
        } else {
            console.log('[' + email + '] is already registered. Go away.');
            throw new Meteor.Error('Email already taken.');
        }
    },

    login: function (email, key) {
        console.log('[' + email + '] logging in...');
        var attendee = Attendees.findOne({email: email, key: key});
        if (attendee === undefined) {
            console.log('[' + email + '] attendee not found. Wrong email or key.');
            throw new Meteor.Error('Wrong attendee id or key.');
        } else {
            console.log('[' + email + '] key is ok. Logged in.');
            this.setUserId(attendee._id);
            return attendee;
        }
    },

    logout: function () {
        if (this.userId !== null) {
            console.log('Logged out id: ' + this.userId);
            this.setUserId(null);
        }
        return 'ok';
    },

    toggleWorkshopSignIn: function (id) {
        if (this.userId !== null) {
            console.log('toggleWorkshopSignIn id:' + this.userId);
        } else {
            console.log('Tried to toggle workshopId, not logged in');
        }
    }
});