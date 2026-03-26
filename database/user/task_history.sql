-- SQLite database export
BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "task_history" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    "user_id" TEXT NOT NULL,
    "task_md5" TEXT NOT NULL,
    "task_result" TEXT NOT NULL,
    "created_at" TIMESTAMP NOT NULL
);


COMMIT;
