import {db} from '../../App';

export async function fetchExerciseConfigsForMuscleGroup(
  muscleId: number,
): Promise<ExerciseConfig[]> {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM exercise_config ex JOIN muscle_exercise_mapping mem ON mem.exercise_config_id = ex.id where muscle_group_id = ?',
        [muscleId],
        (tx, results) => {
          const rows = results.rows;
          const exerciseConfigs: ExerciseConfig[] = [];

          for (let i = 0; i < rows.length; i++) {
            const exerciseConfig: ExerciseConfig = rows.item(
              i,
            ) as ExerciseConfig;
            exerciseConfigs.push(exerciseConfig);
          }

          resolve(exerciseConfigs);
        },
        error => {
          reject(error);
        },
      );
    });
  });
}

export async function fetchExerciseFullInformationForExerciseId(
  exerciseConfigId: number,
): Promise<ExerciseConfig> {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM exercise_config WHERE id=?',
        [exerciseConfigId],
        (tx, results) => {
          const rows = results.rows;
          const exercise: ExerciseConfig = rows.item(0) as ExerciseConfig;

          resolve(exercise);
        },
        error => {
          reject(error);
        },
      );
    });
  });
}
