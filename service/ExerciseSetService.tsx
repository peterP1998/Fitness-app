import {db} from '../App';

export function addSetToExercise(
  reps: number,
  weight: number,
  exercise_id: number,
): Promise<Number> {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO exercise_set (reps, weight, exercise_id) VALUES (?, ?, ?);',
        [reps, weight, exercise_id],
        function (tx, result) {
          const idOfSetForExercise = result.insertId;
          resolve(idOfSetForExercise);
        },
        error => {
          reject(error);
        },
      );
    });
  });
}

export function getSetsForExercise(
  exercise_id: number,
): Promise<ExerciseSet[]> {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM exercise_set WHERE exercise_id=?',
        [exercise_id],
        function (tx, results) {
          const rows = results.rows;
          const exerciseSets: ExerciseSet[] = [];

          console.log(rows)
          for (let i = 0; i < rows.length; i++) {
            const exercise: ExerciseSet = rows.item(i) as ExerciseSet;
            exerciseSets.push(exercise);
          }

          resolve(exerciseSets);
        },
        error => {
          reject(error);
        },
      );
    });
  });
}
