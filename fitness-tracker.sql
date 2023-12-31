BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "workout" (
	"id"	INTEGER,
	"name"	TEXT,
	"length"	INTEGER,
	"status"	TEXT,
	"startdate"	DATE,
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "exercise" (
	"id"	INTEGER,
	"workout_id"	INTEGER,
	"exercise_config_id"	INTEGER,
	PRIMARY KEY("id"),
	FOREIGN KEY("exercise_config_id") REFERENCES "exercise_config"("id") ON DELETE CASCADE,
	FOREIGN KEY("workout_id") REFERENCES "workout"("id") ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS "exercise_config" (
	"id"	INTEGER,
	"name"	TEXT,
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "exercise_set" (
	"id"	INTEGER,
	"reps"	INTEGER,
	"weight"	REAL,
	"exercise_id"	INTEGER,
	PRIMARY KEY("id"),
	FOREIGN KEY("exercise_id") REFERENCES "exercise"("id") ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS "muscle_group" (
	"id"	INTEGER,
	"name"	TEXT,
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "muscle_exercise_mapping" (
	"muscle_group_id"	INTEGER,
	"exercise_config_id"	INTEGER,
	PRIMARY KEY("muscle_group_id","exercise_config_id"),
	FOREIGN KEY("exercise_config_id") REFERENCES "exercise_config"("id"),
	FOREIGN KEY("muscle_group_id") REFERENCES "muscle_group"("id")
);
INSERT INTO "exercise_config" VALUES (1,'Push-Ups'),
 (2,'Pull-Ups/Chin-Ups'),
 (3,'Squats'),
 (4,'Deadlifts'),
 (5,'Lunges'),
 (6,'Planks'),
 (7,'Burpees'),
 (8,'Dumbbell Rows'),
 (9,'Bench Press'),
 (10,'Shoulder Press'),
 (11,'Russian Twists'),
 (12,'Mountain Climbers'),
 (13,'Jump Squats'),
 (14,'Leg Press'),
 (15,'Calf Raises'),
 (16,'Bicep Curls'),
 (17,'Tricep Dips'),
 (18,'Hanging Leg Raises'),
 (19,'Kettlebell Swings'),
 (20,'Box Jumps'),
 (21,'Hip Thrusts'),
 (22,'Reverse Flyes'),
 (23,'Bicycle Crunches'),
 (24,'Flutter Kicks'),
 (25,'Lat Pulldowns'),
 (26,'Barbell Hip Thrusts'),
 (27,'Romanian Deadlifts'),
 (28,'Side Planks'),
 (29,'Seated Cable Rows'),
 (30,'Battle Ropes');
INSERT INTO "muscle_group" VALUES
    (1,'CHEST'),
    (2,'SHOULDERS'),
    (3,'TRICEPS'),
    (4,'CORE'),
    (5,'BACK'),
    (6,'BICEPS'),
    (7,'CALVES'),
    (8,'LEGS');
    
INSERT INTO "muscle_exercise_mapping" VALUES
    (1,1), (1,2), (1,3), (1,4), (1,9), (1,10), (1,11), (1,13),
    (2,5), (2,6), (2,7), (2,8), (2,10), (2,17), (2,18), (2,22),
    (3,6), (3,9), (3,10), (3,17), (3,19), (3,24),
    (4,11), (4,12), (4,16), (4,18), (4,21), (4,22),
    (5,5), (5,8), (5,11), (5,13), (5,14), (5,25), (5,26), (5,27), (5,29),
    (6,6), (6,8), (6,16), (6,19), (6,21), (6,23), (6,26),
    (7,15),
    (8,3), (8,4), (8,5), (8,10), (8,13), (8,14), (8,16), (8,19), (8,20), (8,21), (8,23);
CREATE INDEX IF NOT EXISTS "idx_workout_name" ON "workout" (
	"name"
);
COMMIT;
