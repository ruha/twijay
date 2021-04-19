// If you want to code in your own text, add it into the area below.
let quotes = [
    'Happy Birthday to You',
    'Happy Birthday to You',
    'Happy Birthday Dear Friend',
    'Happy Birthday to You.',
];

/**
 *
 * Do NOT change anything below unless you understand JavaScript.
 *
**/

// On load, check to see if they prefer to use hardcoded quotes.
window.addEventListener('onWidgetLoad', function (obj) {
    const fieldData = obj.detail.fieldData;
    if (!fieldData.preferHardCoding) {
        getRemoteQuotes(fieldData.fileLocation);
    }
});

window.addEventListener('onEventReceived', function (obj) {
    // If it's not a message, stop everything.
    if (obj.detail.listener !== 'message') return;

    const data = obj.detail.event.data;
    const textTrigger = '!apple'; // @TODO Give this a better name.

    if (data["text"].includes(textTrigger)) {
        document.getElementById('quotes').innerHTML = decodeURIComponent(getRandom(quotes));
    }
});

function getRemoteQuotes(fileLocation) {
    let remoteFile = new XMLHttpRequest();

    remoteFile.open("GET", fileLocation, false);
    remoteFile.onreadystatechange = function () {
        if (remoteFile.readyState === 4 && (remoteFile.status === 200 || remoteFile.status == 0)) {
            let returnedText = remoteFile.responseText;
            // Replaces the array of quotes that are hardcoded in.
            quotes = returnedText.split(';');
        }
    }
    remoteFile.send(null);
}

function getRandom(array) {
    return array[Math.floor(Math.random() * array.length)];
}
