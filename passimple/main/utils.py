import string
import random
from zxcvbn import zxcvbn
from cryptography.fernet import Fernet

def generate_password(length=8, letters=True, digits=True, specialChars=False):
    characters = ''
    if letters:
        characters += string.ascii_letters
    if digits:
        characters += string.digits
    if specialChars:
        characters += string.punctuation

    # Verifica si la cadena de caracteres está vacía
    if not characters:
        raise ValueError("Debe seleccionar al menos un tipo de carácter para incluir en la contraseña")

    return ''.join(random.choice(characters) for _ in range(length))


def password_verification(password):
    result = zxcvbn(password)
    score = result['score']
    feedback = result['feedback']['suggestions']
    return {'score': score, 'feedback': feedback}


