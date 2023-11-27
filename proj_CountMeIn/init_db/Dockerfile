# Use an official Python runtime as a parent image
FROM python:3.8-slim

# Set the working directory to /app
WORKDIR /init_db

# Copy the current directory contents into the container at /app
COPY . /init_db

# Install any needed packages specified in requirements.txt
RUN pip install -r requirements.txt

# Run script.py when the container launches
CMD ["python", "./populateDB.py"]

