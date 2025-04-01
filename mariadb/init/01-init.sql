-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS MyAngularAppDb;

-- Use the database
USE MyAngularAppDb;

-- Grant all privileges to the user
GRANT ALL PRIVILEGES ON MyAngularAppDb.* TO 'aspnetuser'@'%';
GRANT ALL PRIVILEGES ON MyAngularAppDb.* TO 'aspnetuser'@'localhost';

-- Flush privileges to apply changes
FLUSH PRIVILEGES; 