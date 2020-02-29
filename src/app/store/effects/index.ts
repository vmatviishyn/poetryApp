import { UserEffects } from './user.effect';
import { NotificationEffects } from './notifications.effect';

export const effects: any[] = [
  UserEffects,
  NotificationEffects
];

export * from './user.effect';
export * from './notifications.effect';
