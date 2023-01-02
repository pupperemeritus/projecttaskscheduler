# Backend Server API REFERENCE

## Group

-   GET `http://localhost:8000/group/`

    -   Getting All Groups

-   POST `http://localhost:8000/group/`

    -   Creating One Group
    -   Inputs :
        -   groupName
        -   emails(single string separated by commas)
    -   Returns :
        -   GroupObject Created in Database

-   GET `http://localhost:8000/group/:id/`

    -   Getting One Group

-   PATCH `http://localhost:8000/group/:id/`

    -   Editing One Group
    -   Inputs(remember to fetch and put in state before calling this) :
        -   groupName
        -   emails(single string separated by commas)
    -   Returns :
        -   Edited Object Stored in Database

-   DELETE `http://localhost:8000/group/:id/`

    -   Deleting One Group

### `ones with :id have group id as parameter`

## User

-   GET `http://localhost:8000/user/`

    -   Getting All Users

-   POST `http://localhost:8000/user/`

    -   Creating One User
    -   Inputs :
        -   name
        -   email
    -   Returns :
        -   User Object Created in Database

-   GET `http://localhost:8000/user/:id/`

    -   Getting One User

-   PATCH `http://localhost:8000/user/:id/`

    -   Editing One User
    -   Inputs(remember to fetch and put in state before calling this) :
        -   name
        -   email
    -   Returns :
        -   Edited Object Stored in Database

-   DELETE `http://localhost:8000/user/:id/`

    -   Deleting One User

### `ones with :id have user id as parameter`

## Task

-   GET `http://localhost:8000/taskk/`

    -   Getting All Users

-   POST `http://localhost:8000/task/`

    -   Creating One Task
    -   Inputs :
        -   title
        -   taskDescription
        -   groupName
        -   taskEndingDate
        -   assignor
        -   assignee
    -   Returns :
        -   User Object Created in Database

-   GET `http://localhost:8000/task/:id/`

    -   Getting One Task

-   PATCH `http://localhost:8000/user/:id/`

    -   Editing One Task
    -   Inputs(remember to fetch and put in state before calling this) :
        -   title
        -   taskDescription
        -   groupName
        -   taskEndingDate
        -   assignor
        -   assignee
    -   Returns :
        -   Edited Object Stored in Database

-   DELETE `http://localhost:8000/task/:id/`

    -   Deleting One Task

### `ones with :id have task id as parameter`
