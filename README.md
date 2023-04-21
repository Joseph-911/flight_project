# Flight Project

## Introduction
Flight project is a website for a flight management system, allows airline companies to advertise flights and for customers to choose the flight that suits them best.

## Requirements
1. Python ≥ 3.11
1. Node.js ≥ 16.17.0

## Before We Start:
he program is using environment variables for some values, and are required to start the project.

In the very first steps, before starting the project, the program will ask you to fill in required inputs, this will:
* Create a new .env file in the root directory 
* Create a new MySQL database 
* Create a Django superuser 

Inputs:
* Database Name
* Database User
* Database Password
* Admin Username
* Admin Email
* Admin Password

*NOTE: MySQL will ask to 'Enter Password' again to get access to MySQL Workbench.*

**Alternative Way 1:**
1. Create the database manually in MySQL Workbench.
2. Create a new file named `.env` in the root directory and add the values (replace VALUE):
```
DATABASE_NAME=VALUE
DATABASE_USER=VALUE
DATABASE_PASSWORD=VALUE
ADMIN_USERNAME=VALUE
ADMIN_EMAIL=VALUE
ADMIN_PASSWORD=VALUE
```

*NOTE: Don't add any spaces between variables, equal signs and values, example: DATABASE_NAME=flight_project.*

**Alternative Way 2 (without .env):**
(after cloning)
1. Create Database in MySQL Workbench.
1. Open `backend/settings.py`, and change the values in `DATABASE = {...}` to the values that matches yours.
2. Open `backend/scripts/create_admin.py` and change the values of the superuser.

*NOTE: To create the superuser manually, you can go to `backend/users/signals.py` and comment/remove the function `run_create_admin`.*


**In case you decided to create the database and add the values manually, please ignore Step 3 (Create environment variables and database) in "Getting Started" section.**


## Getting Started:

**Note: the tools and shortcuts provided below in the steps list, for Visual Studio Code users, if you're using another IDE please check the documentation of your IDE**

1. **Clone the project:**

    Open your favorite IDE and clone the project.
    

2. **Create virtual environment ([Follow this tutorial](https://code.visualstudio.com/docs/python/tutorial-django)):**

    2.1. Select the interpreter (check requirements section if you have more than one python version).

    2.2. Create virtual environment (check tutorial).

    2.3. Again, Select Python interpreter, but with `.venv` beside it.

    2.4. Active the virtual environment.


3. **Create environment variables and database:**

    Run the command:

    `python welcome.py`

    And fill in the inputs (Check "Before We Start" section)


4. **Install requirements:**

    Open the Terminal in IDE (View > Terminal), then:
    1. Go to backend folder `cd backend`
    2. Install requirements with `pip install -r requirements.txt`
    3. Go to frontend folder `cd../frontend`
    4. Install packages with `npm install` 


5. **Run the project:**

    To start the project successfully, run the commands **in order**:
    
    1. Go to backend folder and run the commands:

        `python manage.py makemigrations`

        `python manage.py migrate`

        `python manage.py runserver`


    2. Go to frontend folder and run the commands:

        `npm start`

        `npm start`


    Open [`127.0.0.1:8000`](http://127.0.0.1:8000/) and [`127.0.0.1:3000`](http://127.0.0.1:3000/) and enjoy &#127881;!

    **NOTE: It's important to use the IP address "127.0.0.1" for both, due to Cross-site request forgery (also known as CSRF)**