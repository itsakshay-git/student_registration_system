const studentData = JSON.parse(localStorage.getItem('studentsData')) || [];
const toast = document.getElementById('toast');

/**
 * Function to dynamically generate a table from student data.
 * 
 * 1. Accesses the global variable `studentData`, which stores an array of student objects.
 * 2. Retrieves the table body element using a DOM selector.
 * 3. Checks if the table body has no rows; if so, adds a dynamic filler sentence as a placeholder.
 * 4. Iterates through the `studentData` array:
 *    - Creates a new "tr" (table row) element for each student.
 *    - Populates the row with dynamic "td" (table data) elements based on student data.
 *    - Appends the completed row to the table body.
 */
function generateTable() {
    const tableBody = document.querySelector('#student_table tbody');
    tableBody.innerHTML = "";

    if(studentData.length === 0){
        const noStudentData = document.createElement('tr');
        noStudentData.classList.add('no_students');
        noStudentData.innerHTML = '<td colspan="5">No, students. Add student to display the list.</td>';
        tableBody.appendChild(noStudentData);
        return;
    }

    studentData.forEach(record => {
        const row = document.createElement('tr');
        row.classList.add('row');
        row.innerHTML = `
        <td>${record.studentName}</td>
        <td>${record.studentId}</td>
        <td>${record.studentEmail}</td>
        <td>${record.studentRollNo}</td>
        <td>${record.studentContact}</td>
        <td class="actions">
            <button id="save_btn" onclick="saveButton(this,'${record.studentName}', '${record.studentId}', '${record.studentEmail}', '${record.studentRollNo}', ${record.studentContact})">Save</button>
            <button id="cancel_btn" onclick="cancelButton(this, '${record.studentName}', '${record.studentId}', '${record.studentEmail}', '${record.studentRollNo}', ${record.studentContact})">Cancel</button>
            <button onclick="editStudent(this, '${record.studentName}', '${record.studentId}', '${record.studentEmail}', '${record.studentRollNo}', ${record.studentContact})"><img src='./assets/Edit.png'/>Edit</button>
            <button onclick="deleteStudent(this, '${record.studentId}', '${record.studentRollNo}')"><img src='./assets/Delete.png'/>Delete</button>
        </td>
        `;
        tableBody.appendChild(row)
    })
}


/**
 * Function to handle the "Add" button click event.
 * 
 * 1. Retrieves input elements by their IDs for student name, email, ID, roll number, and contact.
 * 2. Processes the values from the retrieved elements.
 * 3. Validates the input fields:
 *    - Checks if any input field is empty; if so, displays a toast notification.
 *    - Validates input values:
 *      - Name must contain only characters.
 *      - Email must be a valid string that matches a regex pattern.
 *      - ID, roll number, and contact must be numeric.
 * 4. Checks for duplicate data in the `studentData` array using the `some()` method:
 *    - If duplicate data is found, displays a toast notification.
 *    - If no duplicates are found, adds the new data to the `studentData` array.
 * 5. Retrieves the table body element using a DOM selector.
 * 6. Checks for a placeholder filler row in the table body; if present, removes it using `.remove()`.
 * 7. Creates a new "tr" (table row) element, populates it with dynamic "td" (table data) elements 
 *    containing the input data, and appends it to the table body.
 * 8. Resets or clears the input fields to prepare for the next entry.
 */
async function add(){
    const addButton = document.getElementById('add_btn');
    addButton.disabled = true;
    addButton.classList.add('loading')
    addButton.textContent = 'Adding...'


    const studentNameInput = document.getElementById("student_name");
    const studentIdInput = document.getElementById("student_id");
    const studentEmailInput = document.getElementById("class");
    const rollNoInput = document.getElementById("roll_no");
    const studentContactInput = document.getElementById("contact");
    console.log(studentContactInput)

    // validation
    const studentName = studentNameInput.value.trim();
    const studentId = studentIdInput.value.trim();
    const studentEmail = studentEmailInput.value.trim();
    const studentRollNo = rollNoInput.value.trim();
    const studentContact = studentContactInput.value.trim();


    if(!studentName || !studentId || !studentEmail || !studentRollNo || !studentContact){
        let emptyFields = [];
        if(!studentName) emptyFields.push('Student Name');
        if(!studentId) emptyFields.push("Student Id");
        if(!studentEmail) emptyFields.push("Email");
        if(!studentRollNo) emptyFields.push("Roll No");
        if(!studentContact) emptyFields.push("Contact No")
        resetBtn(addButton)
        showToast(`please fill all student input fields ${emptyFields.join(', ')}`, 'error')
        return
    }

    if(studentContact.length !== 10){
        showToast('contact no length must me 10', 'error');
        resetBtn(addButton);
        return
    }

    if(!/^[a-zA-Z\s]+$/.test(studentName)){
        showToast('student name must only contain letters', 'error');
        resetBtn(addButton);
        return
    }

    if(!emailValidation(studentEmail)){
        showToast('enter valid email Address', 'error');
        resetBtn(addButton);
        return
    }

    if(isNaN(studentId) || isNaN(studentRollNo) || isNaN(studentContact)) {
        showToast('student id and roll no must be in number', 'error');
        return
    };

    const filterStudent = studentData.some(record => record.studentId === studentId || record.studentRollNo === studentRollNo || record.studentEmail === studentEmail);


    if(filterStudent){
        resetBtn(addButton);
        showToast('Duplicate data found. please add unique student Id, Roll No and Email', 'error')
        studentNameInput.value = "";
        studentIdInput.value = "";
        studentEmailInput.value = "";
        rollNoInput.value = "";
        studentContactInput.value = "";
        return
    }

    studentData.push({studentName, studentId, studentEmail, studentRollNo, studentContact});
    localStorage.setItem('studentsData', JSON.stringify(studentData));

    const tableBody = document.querySelector('#student_table');

    const noStudents = document.querySelector('.no_students');
    if(noStudents){
        noStudents.remove();
    }

    const row = document.createElement('tr');
    row.classList.add('row');

    row.innerHTML = `
    <td>${studentName}</td>
    <td>${studentId}</td>
    <td>${studentEmail}</td>
    <td>${studentRollNo}</td>
    <td>${studentContact}</td>
    <td class="actions">
        <button id="save_btn" onclick="saveButton(this,'${studentName}', '${studentId}', '${studentEmail}', '${studentRollNo}', '${studentContact}')">Save</button>
        <button id="cancel_btn" onclick="cancelButton(this, '${studentName}', '${studentId}', '${studentEmail}', '${studentRollNo}', '${studentContact}')">Cancel</button>
        <button onclick="editStudent(this, '${studentName}', '${studentId}', '${studentEmail}', '${studentRollNo}', '${studentContact}')"><img src='./assets/Edit.png'/>Edit</button>
        <button id="delete_btn" onclick="deleteStudent(this, '${studentId}', '${studentRollNo}')"><img src='./assets/Delete.png'/>Delete</button>
    </td>
    `;

    //simulating async operation
    await new Promise(resolve => {
        setTimeout(resolve, 1500);
    })

    tableBody.appendChild(row);
    showToast('successfully added', 'success');

    studentNameInput.value = "";
    studentIdInput.value = "";
    studentEmailInput.value = "";
    rollNoInput.value = "";
    studentContactInput.value = "";

    resetBtn(addButton);
}



/**
 * Function to delete a student record from the table and the data source.
 * 
 * @param {HTMLElement} button - The button element that triggered the delete action.
 * @param {string} studentId - The ID of the student to be deleted.
 * @param {string} studentRollNo - The roll number of the student to be deleted.
 * 
 * Functionality:
 * 1. Retrieves the closest parent table row (`<tr>`) of the button using `closest('tr')`.
 * 2. Removes the row from the DOM to update the table visually.
 * 3. Finds the index of the student record in the `studentData` array using `findIndex()` by matching 
 *    the `studentId` and `studentRollNo` parameters.
 * 6. If a matching record is found (index is not -1):
 *    - Removes the record from the `studentData` array using `splice()`.
 *    - Updates the `studentData` array in `localStorage` to persist changes.
 * 7. Displays a success toast notification using `showToast()` to confirm deletion.
 * 8. Calls `generateTable()` to refresh the table and reflect the updated data.
 */
function deleteStudent(button, studentId, studentRollNo){
    const buttonRow = button.closest('tr');
    buttonRow.remove();

    const deleteStudentData = studentData.findIndex(record => record.studentId === studentId && record.studentRollNo === studentRollNo)
    console.log(deleteStudentData)

    if(deleteStudentData !== -1){
        studentData.splice(deleteStudentData, 1);
        localStorage.setItem('studentsData', JSON.stringify(studentData));
    }

    showToast('successfully Deleted', 'success');

    generateTable();

}


/**
 * Function to enable editing of a student's details in the table.
 * 
 * @param {HTMLElement} button - The button element that triggered the edit action.
 * 
 * Functionality:
 * 1. Retrieves the closest parent table row (`<tr>`) of the button using `closest('tr')`.
 * 2. Sets the `contenteditable` attribute to `true` for the first five table cells (`<td>`) 
 *    in the row, allowing the user to modify their content.
 * 3. Highlights the editable row by adding a red outline style.
 * 4. Hides the edit button to prevent duplicate actions.
 * 5. Displays the save and cancel buttons within the row to allow the user to confirm or cancel changes.
 * 6. Hides the delete button during the editing process to avoid accidental deletions.
 */
function editStudent(button, studentName, studentId, studentEmail, studentRollNo, studentContact){
    const editableRow = button.closest('tr');
    editableRow.children[0].setAttribute('contenteditable','true');
    editableRow.children[1].setAttribute('contenteditable','true');
    editableRow.children[2].setAttribute('contenteditable','true');
    editableRow.children[3].setAttribute('contenteditable','true');
    editableRow.children[4].setAttribute('contenteditable','true');
    editableRow.style.outline = '1px solid red';
    button.style.display = 'none';
    const saveButton = editableRow.children[5].children[0];
    const cancelButton = editableRow.children[5].children[1];
    const deleteButton = editableRow.children[5].children[3];

    saveButton.style.display = 'block';
    cancelButton.style.display = 'block';
    deleteButton.style.display = 'none';

}

/**
 * Function to save the updated details of a student and validate the input data.
 * 
 * @param {HTMLElement} button - The button element that triggered the save action.
 * @param {string} studentName - The current name of the student to be updated.
 * @param {string} studentId - The current ID of the student to be updated.
 * @param {string} studentRollNo - The current roll number of the student to be updated.
 * @param {string} studentContact - The current contact information of the student to be updated.
 * 
 * Functionality:
 * 1. Retrieves the closest parent table row (`<tr>`) of the button using `closest('tr')`.
 * 2. Extracts and trims the updated student details from the table row's cells and stores them in an object.
 * 3. Validates the updated data:
 *    - Checks if `studentId`, `studentRollNo`, and `studentContact` are numeric. If not, displays an error toast.
 *    - Checks if `studentName` and `studentEmail` are strings. If not, displays an error toast.
 *    - Ensures the email is valid using the `emailValidation()` function. If invalid, displays an error toast.
 * 4. Finds the index of the current student record in the `studentData` array based on the original student details.
 * 5. If the student record exists, updates it in the `studentData` array and persists the updated array to `localStorage`.
 * 6. Displays a success toast notification upon successful save.
 * 7. Reloads the page after a 1-second delay to reflect the updated data in the table.
 */
function saveButton(button, studentName,  studentId, studentRollNo, studentContact){
    const row = button.closest('tr');
    const updatedData = {
        studentName: row.children[0].textContent.trim(),
        studentId: row.children[1].textContent.trim(),
        studentEmail: row.children[2].textContent.trim(),
        studentRollNo: row.children[3].textContent.trim(),
        studentContact: row.children[4].textContent.trim(),
    }

    if(isNaN(updatedData.studentId) || isNaN(updatedData.studentRollNo) || isNaN(updatedData.studentContact)) {
        showToast('student id and roll no must be in number', 'error');
        return
    };

    if(!isNaN(updatedData.studentName) || !isNaN(updatedData.studentEmail)) {
        showToast('student name and class must be stings', 'error');
        return
    };

    if(!emailValidation(updatedData.studentEmail)){
        showToast('enter valid email Address', 'error');
        return
    }

    const currentDataIndex = studentData.findIndex((record) => record.studentName === studentName || record.studentId === studentId || record.studentRollNo === studentRollNo || record.studentContact === studentContact);

    if(currentDataIndex !== -1){
        studentData[currentDataIndex] = updatedData;
        localStorage.setItem('studentsData', JSON.stringify(studentData));
    }
    showToast('successfully saved', 'success');
    setTimeout(() => {
        window.location.reload();
    }, 1000)
    // generateTable();

}

function cancelButton(button, studentName, studentId, studentEmail, studentRollNo, studentContact){
    console.log('test')
    const row = button.closest('tr');
    row.style.outline = "none";
    row.classList.add('row');

    row.innerHTML = `
    <td>${studentName}</td>
    <td>${studentId}</td>
    <td>${studentEmail}</td>
    <td>${studentRollNo}</td>
    <td>${studentContact}</td>
    <td class="actions">
        <button id="save_btn" onclick="saveButton(this,'${studentName}', '${studentId}', '${studentEmail}', '${studentRollNo}', '${studentContact}')">Save</button>
        <button id="cancel_btn" onclick="cancelButton(this, '${studentName}', '${studentId}', '${studentEmail}', '${studentRollNo}', '${studentContact}')">Cancel</button>
        <button onclick="editStudent(this, '${studentName}', '${studentId}', '${studentEmail}', '${studentRollNo}', '${studentContact}')"><img src='./assets/Edit.png'/>Edit</button>
        <button id="delete_btn" onclick="deleteStudent(this, '${studentId}', '${studentRollNo}')"><img src='./assets/Delete.png'/>Delete</button>
    </td>
    `;
}


function resetBtn(button){
    button.disabled = false;
    button.classList = true;
    button.textContent = 'Add'
}

function emailValidation(email){
    const   EmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return EmailRegex.test(email);
}

function showToast(message, type) {
    toast.textContent = message;
    toast.className = `toast${type}`;
    toast.style.display = 'block';
    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000);
}

document.addEventListener('DOMContentLoaded', generateTable);