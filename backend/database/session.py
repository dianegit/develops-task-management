from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from config import settings

# Create database engine
# Create database engine
connect_args = {}
engine_args = {}

if str(settings.DATABASE_URL).startswith("sqlite"):
    connect_args = {"check_same_thread": False}
else:
    engine_args = {
        "pool_pre_ping": True,
        "pool_size": 10,
        "max_overflow": 20
    }

engine = create_engine(
    str(settings.DATABASE_URL),
    connect_args=connect_args,
    **engine_args
)

# Create session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for models
Base = declarative_base()


def get_db():
    """Dependency for getting database session."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
