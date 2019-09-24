
# Edugo backend mini-project

Thank you for your interest in applying for *Backend Developer* position at Edugo.
As part of the screening proccess, you will be required to complete this mini-project. The mini-project consists of understanding the *Product Description*, *Technical Requirements*, designing and implementing a backend service for a meeting room booking system.
This exercise is expected to take around one day. If it takes too long to complete, please submit what you already have, you will have opportunity to address incomplete issues during a follow-up interview. We value your time and do not wish you to spend more than a whole day on this exercise.

## Everything is APIs

Jeff Bezos issued an email to the whole Amazon company sometime back in the 2000s.
It went somewhat along those lines:

* All teams will henceforth expose their data and functionality
through service interfaces.
* Teams must communicate with each other through these
interfaces.
* There will be no other form of interprocess communication
allowed: no direct linking, no direct reads of another team's data
store, no shared-memory model, no back-doors whatsoever. The
only communication allowed is via service interface calls over the
network.
* It doesn't matter what technology they use. HTTP, Corba,
Pubsub, custom protocols -- doesn't matter. Bezos doesn't care.
* Anyone who doesn't do this will be fired.
* Thank you; have a nice day!

Amazon understood the importance of APIs more than a decade ago. And we would like you to take this spirit as you proceed with this exercise. As a *Backend Developer* at Edugo, it will be your responsibility to design, implement, test and maintain the Edugo APIs. Those APIs will be the engine that makes the Edugo system work.


## Meeting room booking system

Your task will to build a project that satisfies the *Product Description* and *Technical Requiremnts*.


## Product Description

### Objective
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


## Technical Requirements

### Client-side

All client requests will include a standard JWT token in the header.
Assume all jwt tokens have already been validated. You do not need to check if the token signature is valid.
The jwt token payload will look something like this

*Admin user*
```
{
    "user": {
        "id": 1,
        "nickname": "John Smith",
        "roles:" ["admin"]
    }
}
```

*Standard User*
```
{
    "user": {
        "id": 1,
        "nickname": "John Smith",
        "roles:" []
    }
}
```

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

#### How to submit

- We recommend you set up a private git repository for this project.
- Once you are finished you can add @han4wluc to the private repository, or you can zip the project folder and send us the zip file.
- Please do not post the solution in a public repository as we may wish to reuse this mini-project exercise for other candidates in the future.
- For any questions, do not hesitate to ask us on the Wechat group.
