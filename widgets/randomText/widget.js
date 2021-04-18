// @TODO Replace with ability to add link to .txt file.
const quotes = [
    'This is line one.',
    'This is line two.',
    'This is line three.',
    'This is line four.',
    'This is line five.',
    'This is line six.',
    'This is line seven.',
];

window.addEventListener('onWidgetLoad', function(obj) {
    document.getElementById('video').innerHTML = getRandom(quotes);
});

window.addEventListener('onEventReceived', function (obj) {
    const listener = obj.detail.listener;
    

    // if it's not a message, stop everything.
    if (listener !== 'message') return;

    const data = obj.detail.event.data;

    const textTrigger = '!apple';

    if (data["text"].includes(textTrigger)) {
        document.getElementById('quotes').innerHTML = getRandom(quotes);
    }

});

function getRandom(array) {
    return array[Math.floor(Math.random() * array.length)];
}
