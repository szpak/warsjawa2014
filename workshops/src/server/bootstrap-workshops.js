var intervalHandle;

function loadDATAAAAAAAA() {
    Meteor.clearInterval(intervalHandle);
    console.log('Downloading speakers data');

    var retryTime = 5000;
    var refreshRate = 60 * 1000;

    function loadWorkshopOnlyData() {
        console.log('Downloading workshops data');
        Meteor.clearInterval(intervalHandle);
        HTTP.call('GET', Meteor.settings.workshopDataUrl, function (error, result) {
            console.log('Downloading workshops data finished with statusCode: ' + result.statusCode);
            if (error === null || error === undefined) {
                var workshopsData = JSON.parse(result.content);
                (function setupTimeSlots(timeSlots) {
                    for (var i = 0; i < timeSlots.length; ++i) {
                        var timeSlot = timeSlots[i].time_slot;
                        timeSlot._id = timeSlot.id;
                        delete timeSlot.id;
                        console.log('Upserting time slot with id: ' + timeSlot._id);
                        TimeSlots.upsert({_id: timeSlot._id}, timeSlot);
                    }
                })(workshopsData.time_slots);

                (function setupWorkshops(workshops) {
                    for (var i = 0; i < workshops.length; ++i) {
                        var workshop = workshops[i];
                        workshop._id = workshop.id;
                        delete workshop.id;

                        workshop.speakers = workshop.speaker.replace(/\, /g, ',').replace(/\ ,/g, ',').split(',');

                        console.log('Upserting workshop with id: ' + workshop._id + ', ' + workshop.name);
                        Workshops.upsert({_id: workshop._id}, workshop);
                    }
                })(workshopsData.workshops);
                intervalHandle = Meteor.setInterval(loadDATAAAAAAAA, refreshRate);
            } else {
                console.log('Will try to redownload workshops data in: ' + retryTime / 1000 + 's.');
                intervalHandle = Meteor.setInterval(loadWorkshopOnlyData, retryTime);
            }
        });
    }

    HTTP.call('GET', Meteor.settings.speakersDataUrl, function (error, result) {
        console.log('Downloading speakers data finished with statusCode: ' + result.statusCode);
        if (error === null || error === undefined) {
            var speakersData = JSON.parse(result.content);
            for (var i = 0; i < speakersData.length; ++i) {
                var speaker = speakersData[i];
                console.log('Upserting speaker: ' + speaker.name);
                Speakers.upsert({name: speaker.name}, speaker);
            }
            loadWorkshopOnlyData();
        } else {
            console.log('Will try to redownload speakers data in: ' + retryTime / 1000 + 's.');
            intervalHandle = Meteor.setInterval(loadDATAAAAAAAA, retryTime);
        }
    });
}

loadDATAAAAAAAA();