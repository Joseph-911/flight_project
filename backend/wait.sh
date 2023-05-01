#!/bin/sh


until mysql -h mysql -u root -proot -e "SELECT 1"; do
    echo "Waiting for MySQL container to be up..."
        sleep 1
done

if ! mysql -h mysql -u root -proot -e "use flight"; then
    echo "Creating database 'flight'..."
    mysql -h mysql -u root -proot -e "CREATE DATABASE IF NOT EXISTS flight"
fi

python manage.py makemigrations
python manage.py migrate
python manage.py runserver 0.0.0.0:8000