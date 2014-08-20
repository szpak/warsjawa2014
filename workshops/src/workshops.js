console.log('workshops.js');




if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to workshops.";
  };

  Template.hello.events({
    'click input': function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    console.log('users: ' + Meteor.users);
  });
}