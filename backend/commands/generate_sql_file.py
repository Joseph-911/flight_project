import subprocess

def generate_sql_file(database_name, database_user, input_file, output_file):
    with open(output_file, 'w') as f:
        # Write the SQL command to create the database
        f.write(f'CREATE DATABASE IF NOT EXISTS {database_name};\n')

    print('\nEnter database password again to allow access to the MySQL database please\n')
    # Set the command to be executed
    cmd = f'mysql -u {database_user} -p < {input_file}'
    
    # Use subprocess to execute the command in CMD
    subprocess.run(cmd, shell=True)

