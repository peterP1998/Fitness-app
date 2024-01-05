import SQLite, {openDatabase} from 'react-native-sqlite-storage';
import {NativeModules, Platform} from 'react-native';

export const connectToDatabase = () => {
  return openDatabase(
    {name: 'fitnessDb.db', createFromLocation: 1},
    () => {},
    error => {
      console.error(error);
      throw Error('Could not connect to database');
    },
  );
};

export function closeDb(db: SQLite.SQLiteDatabase) {
  if (db) {
    db.close(
      () => {
        console.log('Database closed');
      },
      error => {
        console.error('Error closing database:', error);
      },
    );
  }
}
