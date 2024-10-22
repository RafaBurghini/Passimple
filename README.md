# Passimple

Passimple is a web application developed with Django that allows users to generate secure passwords, verify password security, and manage their user accounts.

## Features

- **Password Generation**: Generate secure and random passwords.
- **Security Verification**: Verify the strength of passwords.
- **Account Management**: Allows users to register, log in, change their profile information, and delete their account.
- **Password Encryption**: Passwords are encrypted before being stored in the database.
- **User-Friendly Interface**: Responsive and user-friendly interface for a better user experience.

## Requirements

- Python 3.6+
- Django 3.0+
- Node.js and npm (for handling frontend dependencies if necessary)

## Installation

1. **Clone the Repository**

   ```sh
   git clone https://github.com/your-username/passimple.git
   cd passimple

2. **Create and Activate a Virtual Environment**
   python -m venv env
   source env/bin/activate


3. **Configure the Database**

   Modify your settings.py file to configure the database settings:
         DATABASES = {
          'default': {
              'ENGINE': 'django.db.backends.sqlite3',
              'NAME': BASE_DIR / 'db.sqlite3',
          }
      }

   
 5. **Apply Migrations**
    
      python manage.py migrate


 6. **Create a Superuser**
    
      python manage.py createsuperuser


 7. **Run the Development Server**

      python manage.py runserver

  **Usage**
  1. Password Generation
        Navigate to the password generation section.
        Select the desired options (length, inclusion of special characters, etc.).
        Click "Generate" to obtain a new password.
  2. Security Verification
        Navigate to the security verification section.
        Enter the password you want to verify.
        Click "Verify" to get an evaluation of the password strength.
  3. Account Management
        Registration: Complete the registration form to create a new account.
        Login: Enter your credentials to log in to your account.
        Profile: Update your profile information and change your password from the profile section.
        Delete Account: Delete your account from the profile section.
