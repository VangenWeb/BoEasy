// While using SQL lite as the DB I need an enum for the Tasks.periodically field
export type TaskPeriod = "daily" | "weekly" | "monthly" | "yearly";
//TODO: Error instead of {ok: false, error: string} return
export type AndyQueryReturn<T> =
  | {
      ok: true;
      data: T;
    }
  | {
      ok: false;
      error: string;
    };

// I just named this AndyQuery cuz I'm Andy and theres like 1 trillion results for just Query or QueryReturn from other libraries
export type AndyQuery<T> = Promise<AndyQueryReturn<T>>;
