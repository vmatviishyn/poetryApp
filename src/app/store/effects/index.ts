import { UserEffects } from './user.effect';
import { NotificationEffects } from './notifications.effect';
import { PoemsEffects } from './poems.effect';

export const effects: any[] = [
  UserEffects,
  NotificationEffects,
  PoemsEffects,
];

export * from './user.effect';
export * from './notifications.effect';
export * from './poems.effect';
