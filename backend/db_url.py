def normalize_database_url(database_url: str) -> str:
    if database_url.startswith("mysql://"):
        return database_url.replace("mysql://", "mysql+pymysql://", 1)

    if database_url.startswith(("postgres://", "postgresql://")):
        return database_url.replace("postgres://", "postgresql+psycopg://", 1).replace(
            "postgresql://", "postgresql+psycopg://", 1
        )

    return database_url
