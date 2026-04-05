-- SQLite database export
BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "user_db" (
    "user_id" INTEGER PRIMARY KEY NOT NULL,
    "pick_pool" TEXT,
);


COMMIT;
