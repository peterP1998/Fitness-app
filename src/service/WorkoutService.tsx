import {db} from '../../App';
import {Workout} from '../model/Workout';

export function addWorkout(name: string): Promise<Number> {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO workout (name, length, startdate, status) VALUES (?, 0, DATETIME("now"), "IN_PROGRESS");',
        [name],
        function (tx, result) {
          const idOfWorkout = result.insertId;
          resolve(idOfWorkout);
        },
        error => {
          reject(error);
        },
      );
    });
  });
}

export async function fetchWorkouts(): Promise<Workout[]> {
  const workouts: Workout[] = [];

  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM workout',
        [],
        (tx, results) => {
          const rows = results.rows;
          const workouts: Workout[] = [];

          for (let i = 0; i < rows.length; i++) {
            const workout: Workout = rows.item(i) as Workout; // Type assertion to Workout
            workouts.push(workout);
          }

          resolve(workouts);
        },
        error => {
          reject(error);
        },
      );
    });
  });
}

export async function getAllWorkoutsInProgress(): Promise<Workout[]> {
  const workouts: Workout[] = [];

  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM workout WHERE status = "IN_PROGRESS"',
        [],
        (tx, results) => {
          const rows = results.rows;
          const workouts: Workout[] = [];

          for (let i = 0; i < rows.length; i++) {
            const workout: Workout = rows.item(i) as Workout; // Type assertion to Workout
            workouts.push(workout);
          }

          resolve(workouts);
        },
        error => {
          reject(error);
        },
      );
    });
  });
}

export async function getWorkoutById(workoutId: number): Promise<Workout> {
  const workouts: Workout[] = [];

  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM workout WHERE id = ?',
        [workoutId],
        (tx, results) => {
          const rows = results.rows;
          const workout: Workout = rows.item(0) as Workout;

          resolve(workout);
        },
        error => {
          reject(error);
        },
      );
    });
  });
}

export async function finishWorkout(workoutId: number): Promise<Number> {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE workout SET status = "DONE", length = CAST(((julianday("now") - julianday(startDate)) * 1440) AS INTEGER) WHERE id = ?;',
        [workoutId],
        (tx, result) => {
          const idOfWorkout = result.insertId;
          resolve(idOfWorkout);
        },
        error => {
          reject(error);
        },
      );
    });
  });
}

export async function deleteWorkout(workoutId: number): Promise<Number> {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM workout WHERE id = ?',
        [workoutId],
        (tx, result) => {
          const idOfWorkout = result.insertId;
          resolve(idOfWorkout);
        },
        error => {
          reject(error);
        },
      );
    });
  });
}

// '-1 year', '-1 month', '-6 months'
export async function getWorkoutsTimePeriod(period: string): Promise<number> {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT COUNT(*) AS workouts_last_week
        FROM workout
        WHERE startdate >= date('now', ?);`, // change -7 days with period
        [period],
        (tx, results) => {
          const count = results.rows.item(0).workouts_last_week;
          resolve(count);
        },
        (tx, error) => {
          reject(error);
        },
      );
    });
  });
}
