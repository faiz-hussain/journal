$(document).ready(()=>{
    let entryId = 0;
    // Variable to create unique IDs for each Journal Entry, which makes it easy to find
    // specific entries in the collection, especially when deleting/modifying an entry.


    $('#write').click(()=>{
        let userSubject = $("#subject").val();
        let userContent = $("#content").val();
        entryId++;
        currentJournal.makeEntry(userSubject, userContent, entryId)
        // Grab user input with .val(), raise the entryId, then create a new Entry object
        // in the current journal.
        
        if (jrnlId === 0 && currentJournal.collection.length) {$('.entryPage').html('')}
        // Remove default text if this is the first entry.

        let newIndex = currentJournal.collection.length-1;
        showEntry(currentJournal.collection[newIndex])
        // The new entry will be the last item in currentJournal.collection, so its index will
        // be equal to length-1. We pass that entry object to the showEntry function to print it 
        // to the page.
    })
})



// Reusable function to render Javascript Journals & Entries as HTML on the page
// Defined in Global scope so createJournal.js can also use this function
function showEntry(entry){
        $(".entryPage").append("<div id='"+entry.entryId+"' class='entry'><h2>"+ entry.subject
                                +"</h2><h3>"+entry.author
                                +"</h3><p>"+entry.content
                                +"</p><button class='btn delete'>Delete</button></div>")
        // jQuery .append() takes strings of HTML as an argument, which we can concatenate with
        // Javascript variables to create dynamic HTML.
        
        $('.delete').click(function(){
            $(this).parent('div').hide();
            let targetId = $(this).parent('div').attr('id');
            for(let i = 0; i < currentJournal.collection.length; i ++){
                if (currentJournal.collection[i].entryId == targetId){
                    currentJournal.collection.splice(i, 1)
                }
            }
        })
        // $(this).parent('div').hide() hides the selected Entry from the HTML.
        // targetId finds the ID of the current entry, then removes that Entry from the Journal collection array.

        // When creating elements dynamically, click handlers must be added AFTER button has been created 
        // to work properly. If you put this at top of your $(document).ready(), your Javascript file will load,
        // try once to attach the click handler to a button that doesn't exist yet, find nothing, then move on.

        // In addition, I used the function keyword, rather than an arrow function. If we use ()=>,
        // '$(this)' will refer to Window, while using function() will associate 'this' with the
        // specific button that was clicked.
    }