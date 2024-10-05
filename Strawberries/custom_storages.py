
from django.conf import settings
from storages.backends.s3boto3 import S3Boto3Storage

class StaticSFilestorage(S3Boto3Storage):
    location = settings.STATICFILES_FOLDER
    # default_acl = 'public-read'

class MediaFilesStorage(S3Boto3Storage):
    location = settings.MEDIAFILES_FOLDER
    file_overwrite = False