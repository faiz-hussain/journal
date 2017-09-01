let allJournals = [];
// Global Array to contain all journals
let jrnlId = 0;
// Journal ID Counter

let defaultJournal = new Journal('My Journal', 'Default Person', jrnlId);
allJournals.push(defaultJournal);
// Create initial Journal 

let currentJournal = allJournals[0];
// Global variable to keep track of which Journal we are currently viewing / editing.
// Initially points to the default journal.

$(document).ready(()=>{
     // Render the Default journal button on the page with click listener
     $(".journalPage").append("<div id='"+allJournals[0].jrnlId+"'>"
        +"<button class='btn select'>"+allJournals[0].title
        +"</button></div>")

    $('.select').click(function(){
        let targetId = $(this).parent('div').attr('id');
        for(let i = 0; i < allJournals.length; i++){
            if (allJournals[i].jrnlId === targetId){
                currentJournal = allJournals[i]
                break
            }
        }
        $('.entryPage').html('')
        $('#jrnlName').text(currentJournal.title)
        for(let i = 0; i < currentJournal.collection.length; i++){
            showEntry(currentJournal.collection[i])
        }
    })

    // Reusable click handler for creating / displaying new journals
    $('#create').click(()=>{
        let jrnlTitle = $("#title").val();
        let jrnlAuthor = $("#author").val();
        jrnlId++;
        
        let newIndex = allJournals.push(new Journal(jrnlTitle, jrnlAuthor, jrnlId)) - 1
        // Use the return value of .push to obtain the index of our newest Journal and
        // simultaneously push the new Journal in to our global array

        $(".journalPage").append("<div id='"+allJournals[newIndex].jrnlId+"'>"
                                +"<button class='btn select'>"+allJournals[newIndex].title
                                +"</button></div>")
        // Create a new button that will allow us to switch between multiple journals

        $('.select').click(function(){
            let targetId = $(this).parent('div').attr('id');
            console.log(targetId)
            for(let i = 0; i < allJournals.length; i++){
                if (allJournals[i].jrnlId == targetId){
                    console.log(allJournals[i])
                    currentJournal = allJournals[i]
                    break
                }
            }
            console.log(currentJournal)
            $('.entryPage').html('')
            $('#jrnlName').text(currentJournal.title)
            for(let i = 0; i < currentJournal.collection.length; i++){
                showEntry(currentJournal.collection[i])
            }
        // Click Listener that:
        //      a) finds the ID of the div/button that was clicked
        //      b) points currentJournal to the Journal object with the target ID
        //      c) removes any previous entries displayed on the page
        //      d) displays title of the current journal
        //      e) loops through currentJournal and displays all the entries
        })
    })
})
