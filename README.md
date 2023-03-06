# YOGI Fitness

An all-purpose fitness app for tracking workout data over time (my first experience using Angular).

## Notable Features

### Frontend (Angular)

- Form validation of user input when creating/editing a workout using `Angular Forms`.
- Colorful and interactive charts for displaying workout statistics using [Chart.js](https://www.chartjs.org/docs/latest/) and HTML `canvas` elements. [ng2-charts](https://valor-software.com/ng2-charts/#LineChart), a Chart.js wrapper for Angular is used for seamless integration into Angular.
- Material Design components (datepicker, dialog, toolbar, buttons, cards and plenty more) using [Angular Material](https://material.angular.io/components/tooltip/overview).
- Route navigation with `Angular Router` for navigation between different pages (home, edit, create, statistics).
- JSON schema validation of data received from the backend using Ajv.js.

### Backend (Nest.js)

- Field validation (`date-time`, `uri` and more) on `POST`/`PUT` requests, using a predefined [JSON Scehma](https://json-schema.org/draft-07/json-schema-release-notes.html) and [Ajv.js](https://ajv.js.org/).
- User data is stored in `Firestore` and is serialized/deserialized using a predefined JSON schema for consistent database documents.
- Dedicated Nest.js `Service` for querying the databse.

## Deployment, User Authentication, Testing

While I did not have time for these, I have examples of them on my GitHub:

- Deployment: [Custom `Helm` chart](https://github.com/amitkummer/MazalTov/tree/master/charts/birthday-calendar/templates) for deploying multiple services on Kubernetes.
- Testing: [Complete Django API testing](https://github.com/amitkummer/mesima/blob/master/backend/manager/tasks/tests/test_tasks.py) done locally using SQLite, while using PostgreSQL for production.
- Authentication/Authorization: I am currently developing a Flask application which uses OIDC for user authentication.

## Things I Would Do Differently

Building a secure API with OIDC/JWT authentication would have taken a long time. If Firebase was used as the backend server instead of Nest, authentication could have been done under the given 3-4 hour time frame using [FirebaseUI](https://firebase.google.com/docs/auth/web/firebaseui).

## Demo

500 workouts visualized. Auto-generated using a custom Python script.

### Home Page

https://user-images.githubusercontent.com/49096391/224510887-5be7324a-9911-4633-9d4c-eac38d3d092e.mp4

### Statistics Page

https://user-images.githubusercontent.com/49096391/224510900-5aad5b90-a119-4b02-b56e-de1fb40fb86f.mp4

### Edit Page

https://user-images.githubusercontent.com/49096391/224510930-cfb4742e-17ca-478b-927d-ae22bbe9651f.mp4

### Create Page

https://user-images.githubusercontent.com/49096391/224510938-0cd93760-1190-42a1-b7fd-3dc3046f6fdb.mp4

