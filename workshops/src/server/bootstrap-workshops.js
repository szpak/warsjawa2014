(function bootstrapWorkshop() {
    titleLog('Bootstrapping workshop data');

    var workshopsData = [
        {
            _id: "123",
            name: "workshop 1",
            speaker: "workshop speaker 1",
            maximumNumberOfAttendees: 10 + Math.floor((Math.random() * 10) + 1),
            description: "Look, just because I don't be givin' no man a foot massage don't make it right for Marsellus to throw Antwone into a glass motherfuckin' house, fuckin' up the way the nigger talks. Motherfucker do that shit to me, he better paralyze my ass, 'cause I'll kill the motherfucker, know what I'm sayin'?"
        },
        {
            _id: "1234",
            name: "workshop 2",
            speaker: "workshop speaker 2",
            maximumNumberOfAttendees: 10 + Math.floor((Math.random() * 10) + 1),
            description: "Look, just because I don't be givin' no man a foot massage don't make it right for Marsellus to throw Antwone into a glass motherfuckin' house, fuckin' up the way the nigger talks. Motherfucker do that shit to me, he better paralyze my ass, 'cause I'll kill the motherfucker, know what I'm sayin'?"
        }
    ];

    for (var i = 0; i < workshopsData.length; ++i) {
        var workshopData = workshopsData[i];
        Workshops.upsert({_id: workshopData._id}, workshopData);
        var workshop = Workshops.findOne({_id: workshopData._id});
        if (workshop.attendees === undefined) {
            Workshops.update({_id: workshop._id}, {$push: {attendees: []}});
        }
    }

    var currentWorkshops = Workshops.find({}).fetch();
    console.log('Number of workshops after update: ' + currentWorkshops.length);
    var workshopNames = [];
    for (var i = 0; i < currentWorkshops.length; ++i) {
        workshopNames.push(workshopsData[i].name);
    }
    console.log('Workshops in db: ' + workshopNames);
})();

(function loadWorkshopsData() {
    var result = HTTP.call('GET', 'http://warsjawa.pl/workshops.html');
    var workshopsData = JSON.parse(result.content);
    console.log(workshopsData.time_slots);
    console.log(workshopsData.tracks);
//    console.log(workshopsData.workshops);
})();
