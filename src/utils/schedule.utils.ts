import type { DayOfWeek, Schedule } from "../interfaces/branch.interface";

const DAY_ORDER: DayOfWeek[] = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
];

const DAY_LABELS: Record<DayOfWeek, string> = {
  MONDAY: "Lunes",
  TUESDAY: "Martes",
  WEDNESDAY: "Miércoles",
  THURSDAY: "Jueves",
  FRIDAY: "Viernes",
  SATURDAY: "Sábado",
  SUNDAY: "Domingo",
};

const signature = (schedule: Schedule) =>
  schedule.isClosed ? "closed" : `${schedule.openTime}-${schedule.closeTime}`;

const rangeLabel = (schedule: Schedule) =>
  schedule.isClosed
    ? "Cerrado"
    : `${schedule.openTime} a ${schedule.closeTime}`;

// Groups consecutive days that share the same hours (or closed status) into
// a single line, e.g. "Lunes a Viernes 08:00 a 18:00" instead of one line per day.
export const formatSchedule = (schedules?: Schedule[]): string => {
  if (!schedules || schedules.length === 0) return "";

  const ordered = DAY_ORDER.map((day) =>
    schedules.find((schedule) => schedule.dayOfWeek === day),
  ).filter((schedule): schedule is Schedule => Boolean(schedule));

  const groups: Schedule[][] = [];
  ordered.forEach((schedule) => {
    const currentGroup = groups[groups.length - 1];
    if (currentGroup && signature(currentGroup[0]) === signature(schedule)) {
      currentGroup.push(schedule);
    } else {
      groups.push([schedule]);
    }
  });

  return groups
    .map((group) => {
      const firstLabel = DAY_LABELS[group[0].dayOfWeek];
      const lastLabel = DAY_LABELS[group[group.length - 1].dayOfWeek];
      const dayLabel =
        group.length > 1 ? `${firstLabel} a ${lastLabel}` : firstLabel;
      return `${dayLabel} ${rangeLabel(group[0])}`;
    })
    .join(", ");
};

/** Both branches (Jalisco, Colima) run on central Mexico time. */
const BRANCH_TIME_ZONE = "America/Mexico_City";

const WEEKDAY_BY_SHORT: Record<string, DayOfWeek> = {
  Mon: "MONDAY",
  Tue: "TUESDAY",
  Wed: "WEDNESDAY",
  Thu: "THURSDAY",
  Fri: "FRIDAY",
  Sat: "SATURDAY",
  Sun: "SUNDAY",
};

const toMinutes = (time: string | null) => {
  if (!time) return null;
  const [hours, minutes] = time.split(":").map(Number);
  return Number.isFinite(hours) && Number.isFinite(minutes)
    ? hours * 60 + minutes
    : null;
};

/** Day of week and minutes since midnight at the branch, whatever the server zone. */
const branchNow = (now: Date) => {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: BRANCH_TIME_ZONE,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return {
    day: WEEKDAY_BY_SHORT[get("weekday")] ?? "MONDAY",
    minutes: Number(get("hour")) * 60 + Number(get("minute")),
  };
};

export interface OpenStatus {
  isOpen: boolean;
  /** "Abierto ahora · cierra a las 19:00" / "Cerrado · abre mañana a las 07:00". */
  label: string;
}

const isOpenDay = (schedule?: Schedule): schedule is Schedule =>
  Boolean(
    schedule &&
      !schedule.isClosed &&
      toMinutes(schedule.openTime) !== null &&
      toMinutes(schedule.closeTime) !== null,
  );

/**
 * "Abierto ahora" status for a branch from its weekly hours. Null when the
 * branch has no hours loaded, so callers hide the chip instead of guessing.
 */
export const getOpenStatus = (
  schedules?: Schedule[],
  now: Date = new Date(),
): OpenStatus | null => {
  if (!schedules?.some(isOpenDay)) return null;

  const { day, minutes } = branchNow(now);
  const byDay = (target: DayOfWeek) =>
    schedules.find((schedule) => schedule.dayOfWeek === target);
  const today = byDay(day);

  if (isOpenDay(today)) {
    const open = toMinutes(today.openTime) as number;
    const close = toMinutes(today.closeTime) as number;
    if (minutes >= open && minutes < close) {
      return { isOpen: true, label: `Abierto ahora · cierra a las ${today.closeTime}` };
    }
    if (minutes < open) {
      return { isOpen: false, label: `Cerrado · abre hoy a las ${today.openTime}` };
    }
  }

  const todayIndex = DAY_ORDER.indexOf(day);
  for (let offset = 1; offset <= 7; offset += 1) {
    const nextDay = DAY_ORDER[(todayIndex + offset) % DAY_ORDER.length];
    const next = byDay(nextDay);
    if (isOpenDay(next)) {
      const when = offset === 1 ? "mañana" : `el ${DAY_LABELS[nextDay].toLowerCase()}`;
      return { isOpen: false, label: `Cerrado · abre ${when} a las ${next.openTime}` };
    }
  }
  return null;
};
