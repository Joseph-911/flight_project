# Base image
FROM python:3.11.2

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Create and set the working directory
WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends build-essential libpq-dev curl default-libmysqlclient-dev default-mysql-client


# Copy the requirements file and install dependencies
COPY requirements.txt .

RUN pip install --upgrade pip
RUN pip install mysqlclient
RUN pip install -r requirements.txt

# ENV DATABASE_NAME=flight
# ENV DATABASE_USER=root
# ENV DATABASE_PASSWORD=root1234
ENV ADMIN_USERNAME=admin
ENV ADMIN_EMAIL=admin@email.com
ENV ADMIN_PASSWORD=admin1234
ENV ADMIN_FIRSTNAME=admin
ENV ADMIN_LASTNAME=admin

# Copy the Django project files
COPY . .

# Expose port 8000 for the Django development server
EXPOSE 8000

# Run the Django development server
# CMD python manage.py makemigrations && python manage.py migrate && python manage.py runserver 0.0.0.0:8000

COPY wait.sh /wait.sh
RUN chmod +x /wait.sh
# CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]


