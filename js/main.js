var newReminder, idCount = 0, taskCount = 0, reminderArray = [], completedArray = [];

function updateIdCount() {
	document.getElementById('remindCount').innerText = reminderArray.length
}
// save & show new reminders
function newReminders(form) {
	// set id count to the length of the reminders array
	idCount = reminderArray.length
	// store the current reminder in newReminder var
	newReminder = {id: idCount, task: form.newReminder.value, completed: false}
	taskCount++
	// push newReminder to reminderArray
	reminderArray.push(newReminder)
	// post item to screen
	showReminders(newReminder)
	// update the reminder count
	updateIdCount()
	// set new reminderArray to localstorage
	localStorage.setItem('session', JSON.stringify(reminderArray))
	// reset form
	form.reset()
	document.getElementById('newReminder').focus()
}

// display a new reminder
function showReminders (test) {
	var div = document.createElement('div'),
		checkbox = document.createElement('input')

	checkbox.setAttribute('type', 'checkbox')
	text = document.createTextNode(" " + test.task)	
	div.setAttribute('id', "task" + test.id)
	div.appendChild(checkbox)
	div.appendChild(text)

	document.getElementById('showCurrentReminders').appendChild(div)
}
// remove reminders
function removeReminders() {
	console.log('remove this')
}
// show localstorage data
function parseDataFromLocalStorage() {
    // Parse the serialized data back into an aray of objects
    reminderArray = JSON.parse(localStorage.getItem('session'));
    // loop thru array
    for (var i = 0; i < reminderArray.length; i++) {
    	showReminders (reminderArray[i])
    };
    // update reminder count
    updateIdCount()   
}
parseDataFromLocalStorage()


// stop enter key from reseting the page
function stopRKey(evt) { 
  var evt = (evt) ? evt : ((event) ? event : null)
  var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null)
  if ((evt.keyCode == 13) && (node.type=="text"))  {return false} 
} 
document.onkeypress = stopRKey;


// get reference to element containing toppings checkboxes
var el = document.getElementById('showCurrentReminders');

// get reference to input elements in toppings container element
var tops = el.getElementsByTagName('input');

// assign function to onclick property of each checkbox
for (var i=0; i < tops.length; i++) {
    if ( tops[i].type === 'checkbox' ) {
        tops[i].onclick = function() {
        	var thisOne = this.closest('div').id
            console.log(thisOne)
        }
    }
}
