console.log('client.js');

var pathnameElements = location.pathname.split('/');
if (pathnameElements.length === 4 && pathnameElements[1] === 'login') {
    var id = pathnameElements[2];
    var key = pathnameElements[3];
    console.log('id: ' + id);
    console.log('key: ' + key);

    Meteor.call('login', id, key, function(error, result) {
        console.log(error);
        console.log(result);
    });
}