var host = 'http://warsjawa.pl:8181';
var timeout = 5000;

var openingDate = new Date(2014, 8, 7, 18);

RegistrationKeys.upsert({_id: 'key1'}, {_id: 'key1', timeHandicap: 1 * 3600*1000, used: false, usedBy: null});
RegistrationKeys.upsert({_id: 'key2'}, {_id: 'key2', timeHandicap: 2 * 3600*1000, used: false, usedBy: null});
RegistrationKeys.upsert({_id: 'key3'}, {_id: 'key3', timeHandicap: 3 * 3600*1000, used: false, usedBy: null});
RegistrationKeys.upsert({_id: 'key4'}, {_id: 'key4', timeHandicap: 4 * 3600*1000, used: false, usedBy: null});

Meteor.methods({
    register: function (name, email, key) {
        if (key !== null && key !== undefined) {
            console.log('[' + email + '] using registration key: ' + key);
        }
        var timeHandicap = 0;
        var registrationKey = RegistrationKeys.findOne({_id: key, used: false});
        if (registrationKey !== undefined) {
            timeHandicap += registrationKey.timeHandicap;
            console.log('[' + email + '] key is ok, giving: ' + new Date(timeHandicap) + ' time handicap.');
        } else {
            console.log('[' + email + '] no unused registration key for this key.');
        }
        var currentDateWithHandicap =  new Date(new Date().getTime() + timeHandicap);
        if (openingDate.getTime() > currentDateWithHandicap.getTime()) {
            console.log('[' + email + '] opening date: ' + openingDate + ' is bigger than current date with handicap: ' + currentDateWithHandicap + '. Rejecting.');
            var error = new Meteor.Error('Cannot register yet.');
            error.details = {timeToWait:openingDate.getTime() - currentDateWithHandicap.getTime()};
            throw error;
        } else {
            console.log('[' + email + '] opening date: ' + openingDate + ' is lower than current date with handicap: ' + currentDateWithHandicap + '. Registering.');
            if (registrationKey !== undefined) {
                console.log('[' + email + '] using key: ' + key);
                RegistrationKeys.update({_id: key}, {$set: {used: true, usedBy: email}});
            }
        }

        console.log('[' + email + '] registering attendee: ' + name);
        var attendee = Attendees.findOne({_id: email});
        if (attendee === undefined) {
            console.log('[' + email + '] attendee not found. Registering him/her with Warsjawa backend.');
            var response = HTTP.call('POST', host + '/users', {timeout: timeout, data: {email: email, name: name}});
            if (response.statusCode === 201) {
                console.log('[' + email + '] registering with Warsjawa backend complete. Adding to db.');
                attendee = Attendees.insert({_id: email, email: email, name: name, key: null});
                return attendee;
            } else {
                console.log('[' + email + '] Warsjawa backend returned status code: ' + response.statusCode + ' abandon thread.');
                console.log(response);
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
            console.log('[' + email + '] attendee not found. Wrong email or key. Trying to check this pair with Warsjawa backend.');
            var response = HTTP.call('PUT', host + '/users', {timeout: timeout, data: {email: email, key: key}});
            if (response.statusCode === 200) {
                console.log('[' + email + '] user confirmed with Warsjawa backend. Move along.');
                Attendees.update({email: email}, {$set: {key: key}});
                attendee = Attendees.findOne({email: email, key: key});
                this.setUserId(attendee._id);
                return attendee;
            } else {
                console.log('[' + email + '] Warsjawa backend returned status code: ' + response.statusCode + ' abandon thread.');
                console.log(response);
                throw new Meteor.Error('Wrong attendee id or key.');
            }
        } else {
            console.log('[' + email + '] key is ok. Logged in.');
            this.setUserId(attendee._id);
            return attendee;
        }
    },

    logout: function () {
        console.log('[' + this.userId + '] logging out. Bye bye');
        this.setUserId(null);
        return undefined;
    },

    toggleWorkshopSignIn: function (id) {
        if (this.userId !== null) {
            console.log('toggleWorkshopSignIn id:' + this.userId);
        } else {
            console.log('Tried to toggle workshopId, not logged in');
        }
    }
});