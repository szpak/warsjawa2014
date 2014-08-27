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

Meteor.methods({
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