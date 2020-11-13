const functions = require('firebase-functions');
const Filter = require('bad-words');

exports.detectEvilUsers = functions.firestore
    .document('/messages/{msgId}')
    .onCreate(async function (doc, ctx) {
        const filter = new Filter();
        const { uid, text } = doc.data();

        if (filter.isProfane(text)) {
            const cleaned = filter.clean(text);
            await doc.ref.update({ text: cleaned });
        }
    });

