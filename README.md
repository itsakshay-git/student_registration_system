# Student Registration System

## Git Link

Check out the demo Git repository for this project:
[Student Registration System GitHub Repository](https://github.com/itsakshay-git/student_registration_system)

---

## Demo Picture
![Screenshot 2024-12-23 001124](https://github.com/user-attachments/assets/05aec35a-dea3-4176-88b8-87179255c326)


## Overview

The **Student Registration System** is a web-based application designed to manage student information efficiently. It allows users to register students, edit their details, view the student list in a table format, and delete entries as needed. The application ensures data integrity through robust validation and a clean user interface.

---

## Features

1. **Add Student**

   - Users can add new students by providing details such as name, email, ID, roll number, and contact.
   - Input validation ensures accurate and clean data entry.

2. **Edit Student**

   - Modify student details directly in the table.
   - Save changes with proper validation.

3. **Delete Student**

   - Remove a student record from both the table and the data source.
   - Ensure dynamic updates to the UI.

4. **Dynamic Table Rendering**

   - Populate the table dynamically with student data.
   - Handle empty states with filler text.

5. **Local Storage Integration**

   - Persist student data in the browser's local storage.
   - Automatically updates local storage upon any changes.

6. **Validation**

   - Ensures data integrity by validating input fields for proper formatting (e.g., valid email, numeric IDs).

7. **Toast Notifications**
   - Provides feedback for successful operations and error handling.

---

## Technologies Used

- **HTML**: Structure of the application.
- **CSS**: Styling and layout.
- **JavaScript**: Logic and interactivity.

---

## File Structure

```
student-registration-system/
├── assets            # assets file.
├── index.html        # Main HTML file.
├── script.js          # Main JavaScript file for application logic.
├── style.css         # Stylesheet for UI.
└── README.md         # Project documentation.
```

---

## How to Use

1. Clone the repository or download the project files.
2. Open `index.html` in a web browser.
3. Use the application:
   - Add student details using the provided form.
   - Edit or delete student entries directly from the table.
4. Refresh the page to see data persisted via local storage.

---

## Functions

### `generateTable()`

- Dynamically generates the table from `studentData`.
- Handles empty states by displaying filler text.

### `add()`

- Handles the "Add" button click event.
- Validates and adds new student data to `studentData`.
- Updates the table and local storage.

### `editStudent(button)`

- Enables editing of a specific student entry.
- Displays save and cancel buttons for confirmation.

### `saveButton(button, studentName, studentId, studentRollNo, studentContact)`

- Saves updated student data.
- Validates input and updates the `studentData` array and local storage.

### `deleteStudent(button, studentId, studentRollNo)`

- Deletes a student record from the table and data source.
- Removes the row from the DOM and updates local storage.

---

## Validation Rules

- **Name**: Must contain only alphabetic characters.
- **Email**: Must follow a valid email format.
- **ID/Roll Number/Contact**: Must be numeric.

---

## Local Storage

- The application uses local storage to persist `studentData`.
- Data is updated in real time with every add, edit, or delete operation.

---

## Author

Developed by Akshay Dhongade.
