# SlidelyFormApp

## Overview
SlidelyFormApp is a Windows Forms application designed to manage user submissions. It allows users to view, create, search, edit, and delete submissions. The application features a clean, user-friendly interface and uses a backend server to store and retrieve submission data.

## Features
- **View Submissions**: Navigate through existing submissions.
- **Create Submissions**: Add new submissions to the database.
- **Search Submissions**: Find specific submissions using keywords.
- **Edit Submissions**: Update details of existing submissions.
- **Delete Submissions**: Remove submissions from the database.
- **Styled Navigation**: Rounded, styled buttons for navigation.

## Prerequisites
- Visual Studio 2019 or later
- .NET Framework 4.7.2 or later
- .Net Desktop Development (for WindowsFormApp)
- Node.js
- npm (Node Package Manager)

## Getting Started

### Backend Setup

1. **Clone the Repository**
   ```sh
   git clone https://github.com/Dhanushpriyanp/SlidelyTask_Form_Backend.git
   cd SlidelyTask_Form_Backend
   ```

2. **Initialize the Project and Install Dependencies**
   ```sh
   npm init -y
   npm install express body-parser typescript ts-node @types/node @types/express
   ```

3. **Start the Server**
   ```sh
   npx ts-node server.ts
   ```
   The server will start on `http://localhost:3000`.


## Usage

### Viewing Submissions
- Click on the "View Submissions" button to open the `ViewSubmissionsForm`.
- Use the "Previous" and "Next" buttons to navigate through the submissions.

### Creating Submissions
- Click on the "Create Submission" button to open the `CreateSubmissionForm`.

### Editing Submissions
- Navigate to the submission you want to edit using the "Previous" and "Next" buttons.
- Modify the details and save the changes.

### Searching Submissions
- Click the "Search" button to search the submission.
- Use the search bar to find specific submissions by email.

### Deleting Submissions
- Navigate to the submission you want to delete using the "Previous" and "Next" buttons.
- Click the "Delete" button to remove the submission.

## Repository
The source code is available for Desktop app on GitHub: [SlidelyFormAppBackend Repository](https://github.com/Dhanushpriyanp/SlidelyTask_Form.git)
