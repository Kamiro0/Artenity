import unittest

from backend.db_url import normalize_database_url


class DatabaseUrlTests(unittest.TestCase):
    def test_normalizes_railway_mysql_url(self):
        self.assertEqual(
            normalize_database_url("mysql://user:pass@host:3306/artenity"),
            "mysql+pymysql://user:pass@host:3306/artenity",
        )

    def test_normalizes_postgres_urls(self):
        self.assertEqual(
            normalize_database_url("postgres://user:pass@host/db"),
            "postgresql+psycopg://user:pass@host/db",
        )
        self.assertEqual(
            normalize_database_url("postgresql://user:pass@host/db"),
            "postgresql+psycopg://user:pass@host/db",
        )

    def test_preserves_driver_specific_url(self):
        url = "mysql+pymysql://user:pass@host:3306/artenity"
        self.assertEqual(normalize_database_url(url), url)
