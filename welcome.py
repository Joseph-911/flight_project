import os
import time

from backend.commands.generate_sql_file import generate_sql_file
from backend.commands.generate_env_file import generate_env_file

def welcome():
    # Print welcome message
    print(f'''
            ______
            _\ _~-\___
    =  = ==(____AA____D
                \_____\___________________,-~~~~~~~`-.._
                /     o O o o o o O O o o o o o o O o  |\_
                `~-.__        ___..----..                  )
                      `---~~\___________/------------`````
                      =  ===(_________D

                      
    Welcome to Flight Project:
    ''')
    
    time.sleep(2)

    # Determine the root directory of the project
    root_dir = os.path.dirname(os.path.abspath(__file__))

    # Create .env file in root directory
    env_file = os.path.join(root_dir, '.env')
    database_name, database_user = generate_env_file(env_file)
    

    # # Get current directory and generate a path to file.sql and create schema
    current_dir = os.getcwd()
    input_file = os.path.join(current_dir, f'{database_name}.sql').replace('\\', '/')
    generate_sql_file(f'{database_name}.sql', database_name, database_user, input_file)


# Execute the welcome function
welcome()



