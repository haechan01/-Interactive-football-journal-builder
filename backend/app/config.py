import os
from datetime import timedelta
from dotenv import load_dotenv

load_dotenv()

# Debug: Print environment variables to verify they're loaded
print(f"API_FOOTBALL_KEY loaded: {'Yes' if os.environ.get('API_FOOTBALL_KEY') else 'No'}")
print(f"API_FOOTBALL_PROVIDER: {os.environ.get('API_FOOTBALL_PROVIDER', 'API-SPORTS')}")

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'hard-to-guess-string'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY') or os.environ.get('SECRET_KEY')
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)
    
    # API Football configuration
    API_FOOTBALL_KEY = os.environ.get('API_FOOTBALL_KEY')
    API_FOOTBALL_PROVIDER = os.environ.get('API_FOOTBALL_PROVIDER', 'API-SPORTS')  # 'API-SPORTS' or 'RAPIDAPI'
    
    # Debug: Print config values
    @classmethod
    def print_config(cls):
        print(f"Config API_FOOTBALL_KEY set: {'Yes' if cls.API_FOOTBALL_KEY else 'No'}")
        print(f"Config API_FOOTBALL_PROVIDER: {cls.API_FOOTBALL_PROVIDER}")
    
class DevelopmentConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'sqlite:///dev.db'

class TestingConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///test.db'

class ProductionConfig(Config):
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')

config = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}