# Frontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.4.

The user is required to log in to use the service. The user can either log in by their own account or by their social account. If the user doesn't have any account, the user can create a new one.
![Login Picture Not Found](image.png)

If the user decides to use social media to log in, the user will be asked their social media account in a prompt popup.
![Facebook Prompt Login Picture Not Found](image-1.png)


When the users is logged in or has created a new account, the user will be redirected to the homepage, where the user can use the services. The navigation bar also will be updated to allow the user to sign out.
![Picture Not Found](image-2.png)

The services allow the user to add new tasks with task status by clicking Submit button. To notify user knowing that the task list has been updated, the toast message will popup.
![Picture Not Found](image-3.png)

![Picture Not Found](image-4.png)

Or, user can edit and update existing tasks by clicking a yellow pencil icon on the right-hand side. In this example, the "Learn MEAN Stack" task's status is changed from "Active" to "Complete."
![Picture Not Found](image-5.png)

Or, user can delete the existing task by clicking a red bin icon on the right-hand side. In this example, the "Invest in Stock" task is deleted.
![Picture Not Found](image-6.png)

The User can sign out by clicking "Sign Out" button on the Nav bar. Then, the user will be redirected to Login Page, and the "Sign Out" button is changed to "Login" button.
![Picture Not Found](image-7.png)

At the Login Page, the user can sign in with email and password. If the email or password is missing, the notification will be showed.
![Picture Not Found](image-8.png)

Or, if the email format is incorrect, the "Email is Invalid" notification will be displayed as well.
![Picture Not Found](image-9.png)

If the user doesn't have an account, the user can create on by clicking on "Create a new account." This will redirect the user to the Register Page. In this page, the user can create an account by input user's full name, email, and password. These fields are required and will be validated.
![Picture Not Found](image-10.png)

In case of forgetting password, the user can click on "Forget your password" link to reset the user's password.
![Picture Not Found](image-11.png)

In this page, the user will be asked to provide email and full name. All provided information are valid, the user will be allowed to reset the password immediately or complete the process later by clicking the link has been sent to the associated email.
![Picture Not Found](image-12.png)
 

To control user access, a guard function has been generated and applied in app-routing.module.ts
![Picture Not Found](image-13.png)

The guard function checks 'token' from LocalStorage. If the 'token' is empty or null, the user can reach to the Home Page. Otherwise, the system will direct the user to the Login Page.
![Picture Not Found](image-14.png)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
