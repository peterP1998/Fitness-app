export class Workout {
  constructor(
    public id: number,
    public name: string,
    public length: number,
    public startdate: string,
    public status: WorkoutStatus,
  ) {}
}

export enum WorkoutStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}
