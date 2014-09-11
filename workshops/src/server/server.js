var host = Meteor.settings.emailHost;
var timeout = Meteor.settings.timeout;
var headers = Meteor.settings.headers;

Meteor.publish('TimeSlots', function () {
    return TimeSlots.find();
});

Meteor.publish('Speakers', function () {
    return Speakers.find();
});

Meteor.publish('Workshops', function () {
    return Workshops.find();
});

Meteor.publish('SignUps', function () {
    return SignUps.find();
});

Meteor.publish('Attendees', function () {
    return Attendees.find({key: {$exists: true}}, {fields: {key:0, email:0, name:0}});
});

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
        var currentDateWithHandicap = new Date(new Date().getTime() + timeHandicap);

        var date = Meteor.settings.openingDate;
        var openingDate = new Date(date[0], date[1], date[2], date[3], date[4]);

        console.log(openingDate);
        if (openingDate.getTime() > currentDateWithHandicap.getTime()) {
            console.log('[' + email + '] opening date: ' + openingDate + ' is bigger than current date with handicap: ' + currentDateWithHandicap + '. Rejecting.');
            var error = new Meteor.Error('Cannot register yet.');
            error.details = {timeToWait: openingDate.getTime() - currentDateWithHandicap.getTime()};
            throw error;
        } else {
            console.log('[' + email + '] opening date: ' + openingDate + ' is lower than current date with handicap: ' + currentDateWithHandicap + '. Registering.');
            if (registrationKey !== undefined) {
                console.log('[' + email + '] using key: ' + key);
                RegistrationKeys.update({_id: key}, {$set: {used: true, usedBy: email}});
            }
        }

        console.log('[' + email + '] registering attendee: ' + name);
        var attendee = Attendees.findOne({email: email});
        if (attendee === undefined) {
            console.log('[' + email + '] attendee not found. Registering him/her with Warsjawa backend.');
            var response = HTTP.call('POST', host + '/users', {timeout: timeout, headers: headers, data: {email: email, name: name}});
            if (response.statusCode === 201) {
                console.log('[' + email + '] registering with Warsjawa backend complete. Adding to db.');
                attendee = Attendees.insert({email: email, name: name, key: null});
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

        function bumpSignUpsTimestamp(attendeeId) {
            SignUps.update({attendeeId: attendeeId, active: true}, {$set:{lastSeen:new Date()}});
            console.log(SignUps.find({attendeeId: attendeeId, active: true}).fetch());
        }

        var attendee = Attendees.findOne({email: email, key: key});
        if (attendee === undefined) {
            console.log('[' + email + '] attendee not found. Wrong email or key. Trying to check this pair with Warsjawa backend.');
            var response = HTTP.call('PUT', host + '/users', {timeout: timeout, headers: headers, data: {email: email, key: key}});
            if (response.statusCode === 200) {
                console.log('[' + email + '] user confirmed with Warsjawa backend. Move along.');
                Attendees.update({email: email}, {$set: {key: key}});
                attendee = Attendees.findOne({email: email, key: key});
                bumpSignUpsTimestamp(attendee._id);
                this.setUserId(attendee._id);
                return attendee;
            } else {
                console.log('[' + email + '] Warsjawa backend returned status code: ' + response.statusCode + ' abandon thread.');
                console.log(response);
                throw new Meteor.Error('Wrong attendee id or key.');
            }
        } else {
            console.log('[' + email + '] key is ok. Logged in.');
            bumpSignUpsTimestamp(attendee._id);
            this.setUserId(attendee._id);
            return attendee;
        }
    },

    logout: function () {
        console.log('[' + Attendees.findOne({_id: this.userId}).email + '] logging out. Bye bye');
        this.setUserId(null);
        return undefined;
    },

    toggleWorkshopSignUp: function (workshopId) {
        var email = Attendees.findOne({_id: this.userId}).email;
        console.log('[' + email + '] is trying to toggle workshop with id: ' + workshopId);
        if (this.userId !== null) {
            var workshop = Workshops.findOne({_id: workshopId});
            var signUps = SignUps.find({active: true, attendeeId: this.userId, timeSlots: {$in: workshop.time_slots}}).fetch();
            var signOutOnly = false;
            for (var i = 0; i < signUps.length; ++i) {
                var signUp = signUps[i];
                signOutOnly = signOutOnly || signUp.workshopId === workshopId;
                SignUps.update({_id: signUp._id}, {$set: {active: false, deactivationTimestamp: new Date()}});
                HTTP.call('DELETE', host + '/emails/' + signUp.workshopId + '/' + Attendees.findOne({_id: signUp.attendeeId}).email, {timeout: timeout, headers: headers}, function (error, result) {
                    console.log('[' + email + '] delete from wokshop with id: ' + signUp.workshopId + ' status code: ' + result.statusCode);
                });
            }
            if (!signOutOnly) {
                SignUps.insert({timestamp: new Date(), lastSeen:new Date(), workshopId: workshopId, attendeeId: this.userId, active: true, timeSlots: workshop.time_slots});
                HTTP.call('PUT', host + '/emails/' + workshopId + '/' + email, {timeout: timeout, headers: headers}, function (error, result) {
                    console.log('[' + email + '] add to workshop with id: ' + workshopId + ' status code: ' + result.statusCode);
                });
            }
        } else {
            console.log('Tried to toggle workshop with id: ' + workshopId + ', not logged in.');
        }
    },

    openingDate: function () {
        var date = Meteor.settings.openingDate;
        return new Date(date[0], date[1], date[2], date[3], date[4]);
    }
});
