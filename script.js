// Variable to store the currently selected table row (used later for editing functionality)
var selectedRow = null;

// Function to show an alert message on the page
function showAlert(message, className) {
    // Create a new <div> element to display the alert
    const div = document.createElement('div');

    // Add a class to the div for styling the alert (e.g., success or danger)
    div.className = `alert alert-${className}`;

    // Create a text node with the message and append it to the div
    div.appendChild(document.createTextNode(message));

    // Select the container element where the alert will be shown
    const container = document.querySelector(".container");

    // Select the main section (used to position the alert before it)
    const main = document.querySelector(".main");

    // Insert the alert div into the DOM, before the main element
    container.insertBefore(div, main);

    // Automatically remove the alert message after 3 seconds
    setTimeout(() => document.querySelector(".alert").remove(), 3000);
}

// Clear All fields
function clearFields() {
    document.querySelector("#firstname").value = "";
    document.querySelector("#lastname").value = "";
    document.querySelector("#rollno").value = "";
}

// Add Data 
document.querySelector("#student-form").addEventListener("submit" , (e) => {
    e.preventDefault();

    //Get Form Value
    const firstname = document.querySelector("#firstname").value;
    const lastname = document.querySelector("#lastname").value;
    const rollno = document.querySelector("#rollno").value;

    if(firstname == "" || lastname == "" || rollno == "") {
        showAlert("Please Enter all in fields", "danger");
    }
    else{
        if(selectedRow == null){
            const list = document.querySelector("#student-list");
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${firstname}</td>
                <td>${lastname}</td>
                <td>${rollno}</td>
                <td>
                    <a href="#" class="btn btn-info btn-sm edit">Edit</a>
                    <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
                </td>
            `;
            list.appendChild(row);
            selectedRow = null;
            showAlert("Student added successfully", "success");
        }
        else{
            selectedRow.children[0].textContent = firstname;
            selectedRow.children[1].textContent = lastname;
            selectedRow.children[2].textContent = rollno;
            selectedRow = null;
            showAlert("Student edited successfully", "success");
        }

        clearFields();
    }
});

// Edit Data
document.querySelector("#student-list").addEventListener("click", (e) => {
    target = e.target;
    if(target.classList.contains("edit")){
        selectedRow = target.parentElement.parentElement;
        document.querySelector("#firstname").value = selectedRow.children[0].textContent;
        document.querySelector("#lastname").value = selectedRow.children[1].textContent;
        document.querySelector("#rollno").value = selectedRow.children[2].textContent;
    }
})

// Event listener for delete (or any) action on the student list
document.querySelector('#student-list').addEventListener("click", (e) => {
    // Get the clicked element (could be a button or other element inside the row)
    target = e.target;

    if(target.classList.contains("delete")){
        target.parentElement.parentElement.remove();
        showAlert("Student deleted successfully", "success");
    }
});
