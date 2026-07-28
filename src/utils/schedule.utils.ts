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
