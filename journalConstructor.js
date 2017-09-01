// Basic Constructor Functions for Entries and Journals.
// Properties (this.title, this.author) are assigned the values supplied as parameters (title, author).
function Journal (title, author, jrnlId) {
    this.title = title;
    this.author = author;
    this.jrnlId = jrnlId;
    this.collection = [];

    // In Journal.makeEntry, the new entry inherits the author property from the parent Journal.
    this.makeEntry = function(subject, content, Id){
        let newEntry = new Entry(subject, this.author, content, Id);
        this.collection.push(newEntry)
    }
}

function Entry (subject, author, content, entryId){
    this.subject = subject;
    this.author = author;
    this.content = content;
    this.entryId = entryId;
}

// Note that we must create at least one instance of a Journal (let currentJournal)
// for our app to work. Writing Journal.makeEntry will not work, as this refers back
// to the Journal constructor. We need a specific object instance to work with.
// This happens at the top of createJournal.js