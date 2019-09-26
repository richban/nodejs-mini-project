
# Edugo backend mini-project

## Objective

### Meeting room booking system

Build a meeting room booking system backend

### Feature Specification:

- There are two types of users: *Admin Users* and *Standard Users*. *Admin Users* have privileged permissions as well as all permissions that a *Standard User* has.
- Meeting rooms can be booked for a specific time-slot. Each time slot is 30 minutes, starting from 00:00. So a user can book from 10:00 to 10:30, but not from 10:15 to 10:30 or 10:15 to 10:45. There should be 48 time-slots available in one day.

### User Stories:

- *Admin Users* can create a new meeting room with following information
  - Name of meeting room
  - Description of meeting room
  - Pictures of the meeting room
  - Maximum capacity of the meeting room

- *Admin Users* can edit information of a meeting room

- *Standard Users* can see a list of availalbe meeting rooms
  - Name of meeting room
  - Description of meeting room
  - Pictures of the meeting room
  - Maximum capacity of the meeting room
  - Date and time-slots have been booked and which time-slots are available for booking

- *Standard Users* can book a meeting room
  - When booking a meeting room, users must specify:
    - Which room to book
    - Time-slots to book
    - Title of the meeting
    - Description of the meeting
  - If the time-slot is already booked, an attempt to book should fail

- *Standard Users* can cancel a meeting room
  - Booked meetings can be cancelled 1 hour before the meeting
  - If the cancellation happens after 1 hour before the meeting, an attempt to cancel should fail

- [Nice-to-have] Admin should be notified everytime a meeting room has been booked or cancelled.
  - The notification should include the following information
    - Who booked the meeting room
    - Name of meeting room
    - Date and time-slots of the booking.
    - Whether it is a new booking or a cancellation
- [Nice-to-have] Users should be reminded of a meeting 30 minutes before the meeting starts

### Notification Service

For the [Nice-to-have] requirements, you will required to call another API. Refer to the `notifiation-api.swagger.yaml` its usage.

### Tech stack

- Use `Swagger` to write documentation of the APIs
- Implement the requirements with `nodejs` or `typescript`
  - We use `express`, but you can choose any web framework of our choice
  - Use an ORM of your choice
- Use a relational database for persistence. We recommend sql-lite for simplicity
- The project must have unit and/or integration tests
- [Nice-to-have] Run test coverage reports
- [Nice-to-have] Write a dockerfile for deploying the project.
  - The app should be ready to be deployed by running something like this `docker run edugo/booking-rooms:latest npm start`
- In the readme include how to start the server, and how to run tests and a link to the swagger documentation
- Use git for version control, keep commit clean and iterative


# About project

### Instalation

Clone the repo

```
git clone https://github.com/richban/edugo-ai-mini-project
```

Change to the project folder and install development and producation dependencies.

```
npm install
```

Start server

```
npm run local
```

Run unit tests

```
npm run test
```

### TODO

- [Feature] Cancel Meeting
- [Feature] Notifications
- Add pics of meeting rooms (local)
- Deployment Dockerization
- Validation of the date-time in the request body `/room/:id/book`
- Unit tests
- Finalize proper login endpoint
