# AddUser Form with Validation and Toast Notifications

## Overview

This React component implements a **multi-step form** to add a new user with the following features:

- **Multi-step input:**  
  The form has two steps:  
  1. User's **Name** and **Email**  
  2. User's **Address**: Street, City, Zip Code

- **Form Validation:**  
  Each input field is validated for required data and correct format before proceeding to the next step or submitting the form.
  - Name: Required, non-empty  
  - Email: Required, must be a valid email format  
  - Street: Required  
  - City: Required  
  - Zip Code: Required, numeric and length 5-6 digits

- **Error Handling:**  
  Inline error messages appear below invalid inputs, guiding users to correct mistakes.

- **Toast Notification:**  
  Upon successful user addition, a green-colored toast message confirms the action.

- **Context API Integration:**  
  The form uses a React Context (`UserContext`) to manage users globally and add new users.

---

## How to Use

1. **Navigate the form steps:**  
   - Fill out required fields in Step 1 and click **Next**.  
   - Fill out address fields in Step 2.  

2. **Validation:**  
   - Attempting to go to the next step or submit the form with invalid or empty fields shows error messages and prevents progression.  

3. **Submit:**  
   - When all fields are valid, clicking **Add User** saves the user and shows a green toast message.

4. **Toast Styling:**  
   - The toast background is styled with a green color using inline styles.

---

## Tech Stack

- **React** (Functional components + hooks)  
- **TypeScript** (for type safety)  
- **React Context API** (for state management)  
- **Tailwind CSS** (for styling)  
- **react-hot-toast** (for toast notifications)  

---

## Example Snippet

```tsx
if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
  newErrors.email = "Valid email is required";
  isValid = false;
}

## Installation and Running
Clone the repo

Run npm install or yarn to install dependencies

Run npm start or yarn start to start the development server

Access the form via /dashboard/add route

## Future Improvements
Add more detailed field validations (e.g., zipcode formats per country).

Save partial form state to local storage to prevent data loss.
