# ReimbursementApp
This is an angular client made to consume the Reimbursement Rest API that was written with Spring Boot. The goal was to provide a client-side application that will allow employees to post and view their submitted reimbursements, as well as, the ability to allow managers to approve or deny said reimbursements.

# Features implemented
- Authentication
- Ability for users to post reimbursement requests; with or without a receipt.
- Ability for users to attach a receipt to a reimbursement after it has been submitted.
- Ability for an admin(Manager), to approve or deny a given request.
- Route guarding
- Angular Material for a brilliant look and feel.

# Components
- Admin: Gives the ability to allow Managers to approve/deny posted reimbursements.

- Create-Ticket: This is the page that is used to create reimbursement requests.

- Login: Allows users to login and use the service. (Thanks captain obvious.)

- Navigation: A simple navigation bar that adapts to whether the user is logged in or not. After log in, there will be a button that allows the user to log out. It also helps to keep the web page from looking plain.

- Portal: This is the landing page for users after successful login. Depending on the user's role, it may or may not show the management card.

- Profile: This is where the user can go to find their personnal info such as user id, email, etc.

- View-Ticket: The area where users can go to view the reimbursements that they have submitted. It also allows the option for users to attach a receipt to a reimbursement that was submitted without a receipt.

# Other:
- Helpers: This contains some helpful functions such as error handling, form validation, fetching user data, etc.
- Image-Dialog: This is an Angular Material component primarily used to view images in a modal. It is used by multiple components as a result.
- Models: Used for models and interfaces utilized throughout the application.
- Services: Holds all AJAX calls to the back-end as well as the logic for the route guards.

# Things For The Future
- Better error handling for the entire application.
- Code refactoring: Some of the same exact code is implemented in multiple componets. It would be great to extract them and make them into reusable functions.
- General code clean up.