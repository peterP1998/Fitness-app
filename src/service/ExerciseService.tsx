import {db} from '../../App';

export async function fetchExercises(): Promise<Exercise[]> {
  const exercises: Exercise[] = [];

  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM exercise',
        [],
        (tx, results) => {
          const rows = results.rows;
          const exercises: Exercise[] = [];

          for (let i = 0; i < rows.length; i++) {
            const exercise: Exercise = rows.item(i) as Exercise;
            exercises.push(exercise);
          }

          resolve(exercises);
        },
        error => {
          reject(error);
        },
      );
    });
  });
}

export async function fetchExercisesForWorkoutId(
  workoutId: number,
): Promise<Exercise[]> {
  const exercises: Exercise[] = [];

  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM exercise WHERE workout_id=?',
        [workoutId],
        (tx, results) => {
          const rows = results.rows;
          const exercises: Exercise[] = [];

          for (let i = 0; i < rows.length; i++) {
            const exercise: Exercise = rows.item(i) as Exercise;
            exercises.push(exercise);
          }

          resolve(exercises);
        },
        error => {
          reject(error);
        },
      );
    });
  });
}

export function addExerciseForWorkout(
  workoutId: number,
  exerciseConfigId: number,
): Promise<Number> {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO exercise (workout_id, exercise_config_id) VALUES (?, ?);',
        [workoutId, exerciseConfigId],
        function (tx, result) {
          const idOfCreatedExercise = result.insertId;
          resolve(idOfCreatedExercise);
        },
        error => {
          reject(error);
        },
      );
    });
  });
}
