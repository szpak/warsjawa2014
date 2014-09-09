var config = Configs.findOne();
var configData = {startDate: new Date(2014, 8, 9, 16, 30)};
if (config === undefined) {
    Configs.insert(configData);
} else {
    Configs.upsert({_id: config._id}, {$set: configData});
}


var cron = new Cron(1000);

function loadWorkshopsData() {
    console.log('Updating workshop data.');

    var result = HTTP.call('GET', 'http://warsjawa.pl/workshops.html');
    var workshopsData = JSON.parse(result.content);

    (function setupTimeSlots(timeSlots) {
        for (var i = 0; i < timeSlots.length; ++i) {
            var timeSlot = timeSlots[i].time_slot;
            timeSlot._id = timeSlot.id;
            delete timeSlot.id;
            TimeSlots.upsert({_id: timeSlot._id}, timeSlot);
        }
    })(workshopsData.time_slots);

    (function setupWorkshops(workshops) {
        for (var i = 0; i < workshops.length; ++i) {
            var workshop = workshops[i];
            workshop._id = workshop.id;
            delete workshop.id;
            Workshops.upsert({_id: workshop._id}, workshop);
        }
    })(workshopsData.workshops);

//    cron.addScheduleJob(Math.round((new Date()).getTime() / 1000) + 60, loadWorkshopsData);
}

loadWorkshopsData();