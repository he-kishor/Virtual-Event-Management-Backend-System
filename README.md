# Virtual-Event-Management-Backend-System😎🤖
 Virtual event management backend system with the specified features, including WebSocket integration for real-time updates and streaming support

 ## project✈️:
  name: Organise_Event
  description: >
    A microservices-based system designed to manage users and event-related functionalities,
    enabling event organizers to create events and users to register seamlessly. 
    The system also includes a notification system for sending event registration confirmations, 
    reminders (24-hour, 3-hour), and payment handling functionality with Razorpay for managing payments.
    Additionally, performance optimization is achieved using Redis for caching user data to ensure smooth message delivery
    and real-time data access.
---
  -version: CURRENT
---
  ## technologies:
    - Node.js
    - Express.js
    - JWT (JSON Web Token) for Authentication
    - OAuth2 Google Authentication
    - Mocha for Testing
    - MongoDB for Database
    - Redis for Cache Handling
    - Razorpay for Payment Handling
---
  ## components:
    - User Management: Handles user registration, login, and authentication.
    - Event Management: Allows organizers to create events and users to register for them.
    - Notification System: Sends event registration confirmations, reminders (24-hour and 3-hour), and ticket information via email/SMS.
    - Payment System: Razorpay integration to handle payments for events.
---
  ## API Endpoints:
    users:
      - path: "/api/users"
        description: "Handles user registration, authentication, and details retrieval."
        methods:
          - POST:
              endpoint: "/api/users/register"
              description: "Register a new user."
              body:
                required:
                  - email
                  - password
                  - role (organizer, user)
              response:
                success: "User registered successfully."
                error: "Error registering user."
          - POST:
              endpoint: "/api/users/login"
              description: "User login to obtain JWT token."
              body:
                required:
                  - email
                  - password
              response:
                success: "JWT token returned."
                error: "Invalid credentials."

    events:
      - path: "/api/organiser/events"
        description: "Handles event creation, retrieval, and management."
        methods:
          - POST:
              endpoint: "/api/organiser/create_event"
              description: "Create a new event."
              headers:
                required:
                  - Authorization: "Bearer [JWT_TOKEN]"
              body:
                required:
                  - e_name
                  - e_details
                  - event_time
                  - event_add
                  - capacity
                  - fees
              response:
                success: "Event created successfully."
                error: "Error creating event."
          - GET:
              endpoint: "/api/organiser/events"
              description: "Get all events for the organizer."
              headers:
                required:
                  - Authorization: "Bearer [JWT_TOKEN]"
              response:
                success: 
                  - e_name: "Event Name"
                  - e_details: "Event Details"
                  - event_time: "Event Time"
                  - event_add: "Event Address"
                  - capacity: "Event Capacity"
                  - fees: "Event Fees"
                error: "No events found."
          - POST:
              endpoint: "/api/reg/register_event"
              description: "User registers for an event."
              headers:
                required:
                  - Authorization: "Bearer [JWT_TOKEN]"
              body:
                required:
                  - event_id
              response:
                success: "User registered for the event successfully."
                error: "Error registering for event."
          - GET:
              endpoint: "/api/reg/get_registrevent"
              description: "Get a list of events a user is registered for."
              headers:
                required:
                  - Authorization: "Bearer [JWT_TOKEN]"
              response:
                success: 
                  - event_id: "Event ID"
                  - event_name: "Event Name"
                  - event_time: "Event Time"
                  - event_address: "Event Address"
                error: "No events found for this user."

  ### notification_system:
    description: "A notification system to send emails and SMS to users."
    events_triggered:
      - event_registration_confirmation: "Email/SMS confirmation when a user registers for an event."
      - event_reminder_24h: "Email/SMS reminder sent 24 hours before event."
      - event_reminder_3h: "Email/SMS reminder sent 3 hours before event."
      - event_ticket_details: "Email/SMS sent with event tickets."

  ### payment_system:
    description: "Integration with Razorpay for handling payments."
    functionality:
      - payment_processing: "Process payments for events via Razorpay."
      - payment_details: "Provide users with detailed payment information."
    -endpoints:
      - POST:
          endpoint: "/api/payment/process_payment"
          description: "Process a payment for an event using Razorpay."
          body:
            required:
              - event_id
              - amount
              - user_id
              - payment_method
          response:
            success: "Payment processed successfully."
            error: "Error processing payment."

  ## caching:
    description: "Cache user data using Redis to improve system performance."
    usage:
      - caching_user_data: "Cache frequently accessed user data to reduce latency and ensure smooth user experience."

  ## example_requests:
    - name: "Register for Event"
      method: "POST"
      url: "http://localhost:3003/api/reg/register_event"
      headers:
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
      body:
        event_id: "673f223c31975bc661a4471"
    - name: "Create Event"
      method: "POST"
      url: "http://localhost:3003/api/organiser/create_event"
      headers:
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
      body:
        e_name: "Stand Goodtime Comedy"
        e_details: "The person will come and tell the jokes."
        event_time: "2024-11-22T18:44:06.000"
        event_add: "Gurugram Haryana"
        capacity: 200
        fees: 1300.00
    - name: "Get All Events"
      method: "GET"
      url: "http://localhost:3003/api/organiser/events"
      headers:
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

