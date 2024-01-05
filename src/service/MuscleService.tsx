import {db} from '../../App';
import {MuscleGroup} from '../model/MuscleGroup';

export async function fetchMuscleGroups(): Promise<MuscleGroup[]> {
  const muscleGroups: MuscleGroup[] = [];

  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM muscle_group',
        [],
        (tx, results) => {
          const rows = results.rows;
          const muscleGroups: MuscleGroup[] = [];

          for (let i = 0; i < rows.length; i++) {
            const muscleGroup: MuscleGroup = rows.item(i) as MuscleGroup;
            muscleGroups.push(muscleGroup);
          }

          resolve(muscleGroups);
        },
        error => {
          reject(error);
        },
      );
    });
  });
}
