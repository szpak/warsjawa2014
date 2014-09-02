//Meteor.Router.add('/attendees', 'POST', function () {
//    var attendee = this.request.body;
//    attendee._id = attendee.id;
//    delete attendee.id;
//    attendee.workshops = [];
//    var foundAttendee = Attendees.findOne({_id: attendee._id});
//    if (foundAttendee === undefined) {
//        console.log('Adding new attendee: ' + JSON.stringify(attendee));
//        Attendees.insert(attendee);
//    } else {
//        console.log('Tried to add new attendee with id: ' + attendee._id + ', but it is already present in db.')
//    }
//});

var host = 'http://warsjawa.pl:8181';

Meteor.methods({
    register: function (name, email) {
        console.log('[' + email + '] registering attendee: ' + name);
        var attendee = Attendees.findOne({_id: email});
        if (attendee === undefined) {
            console.log('[' + email + '] attendee not found. Registering him/her with Warsjawa backend.');
            var response = HTTP.call('POST', host + '/users', {timeout:3000, data: {email: email, firstName: name, lastName: 'NOT USED!'}});
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

    confirmation: function (email, key) {
        var attendee = Attendees.findOne({_id: email, key: key});
        if (attendee !== undefined) {
            console.log('Attendee: ' + email + ' is already confirmed. Logging him instead.');
            this.setUserId(email);
            return 'ok';
        }

        // /users PUT
        var response = Meteor.http.get('http://warsjawa.pl/');
        if (response.statusCode == 200) {
            attendee = Attendees.findOne({_id: email});
            if (attendee === undefined) {
                throw new Meteor.Error('Something wrong happen with user confirmation.');
            }
            Attendees.update({_id: email}, {$set: {key: key}});
            return 'ok';
        } else {
            throw new Meteor.Error('Something wrong happen with user confirmation.');
        }
    },

    login: function (id, key) {
        var attendee = Attendees.findOne({_id: id, key: 'key'});
        if (attendee === undefined) {
            console.log('Tried to log in with id: ' + id + ', and key: ' + key);
            throw new Meteor.Error('Wrong attendee id or key.');
        } else {
            console.log('Logged in with id: ' + id + ', and key: ' + key);
            this.setUserId(id);
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