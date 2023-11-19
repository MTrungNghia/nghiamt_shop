from base64 import b64decode
import jwt
import datetime
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.authentication import BaseAuthentication, get_authorization_header
from .models import User


class JWTAuthentication(BaseAuthentication):
    def authenticate(self, request):
        auth = get_authorization_header(request).split()

        if auth and len(auth) == 2:
            token = auth[1].decode('utf-8')
            id = decode_access_token(token)

            user = User.objects.filter(pk=id).first()

            return (user, None)
        raise AuthenticationFailed('Unauthenticated!')


def create_access_token(id):
    return jwt.encode({
        'id': id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
        'iat': datetime.datetime.utcnow()
    }, 'access_secret', algorithm='HS256')


def decode_access_token(token):
    try:
        print(token)
        payload = jwt.decode(token, 'access_secret', algorithms='HS256')
        return payload['id']
    except Exception as e:
        print(f'Error: {str(e)}')
        raise AuthenticationFailed('Unauthenticated!')


def create_refresh_token(id):
    return jwt.encode({
        'id': id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=7),
        'iat': datetime.datetime.utcnow()
    }, 'refresh_secret', algorithm='HS256')


def decode_refresh_token(token):
    try:
        payload = jwt.decode(token, 'refresh_secret', algorithms='HS256')
        return payload['id']
    except:
        raise AuthenticationFailed('Unauthenticated!')
