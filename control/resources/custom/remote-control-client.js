'use strict';

var pubnub = new PubNub({
    publishKey: 'pub-c-05fc2891-c6ed-421a-bfa5-a030fcd925b5',
    subscribeKey: 'sub-c-ea1f4512-a258-11e8-89c5-e2f2efdc17a6',
    ssl: true
});

pubnub.addListener({
    message: function(event) {
        var message = event.message;
        jQuery('#display').text(message.slide + '.' + message.part);
    }
});

pubnub.subscribe({
    channels: ['output']
});

function buttonCommand(button) {
    pubnub.publish({
        channel : 'input',
        message : {button: button}
    });
}

jQuery(document).ready(function() {
    jQuery('.btn').click(function (eventObject) {
        var targetId = jQuery(this).attr('id');
        buttonCommand(targetId);
    });
});
