import dayjs, { Dayjs } from "dayjs";
import weekOfYear from "dayjs/plugin/advancedFormat";
import dayOfYear from "dayjs/plugin/dayOfYear";

import { type TaskPeriod } from "~/server/api/bll/types";

dayjs.extend(weekOfYear);
dayjs.extend(dayOfYear);

export class Period {
  currentDate = dayjs(new Date());

  constructor(
    public periodType: TaskPeriod,
    public date?: Dayjs,
  ) {
    if (date) {
      this.currentDate = dayjs(date);
    }
  }

  getPeriodType() {
    return this.periodType;
  }

  getPeriodText() {
    switch (this.periodType) {
      case "daily":
        return `Dag ${this.currentDate.dayOfYear()}, år ${this.currentDate.year()}`;
      case "weekly":
        return `Uke ${this.currentDate.week()}, år ${this.currentDate.year()}`;
      case "monthly":
        return `${this.currentDate.month()}, år ${this.currentDate.year()}`;
      case "yearly":
        return `${this.currentDate.year()}`;
    }
  }

  getPeriodDate() {
    return this.currentDate.date();
  }

  getPeriodDayjs() {
    return this.currentDate;
  }

  getPeriod() {
    switch (this.periodType) {
      case "daily":
        return this.currentDate.dayOfYear();
      case "weekly":
        return this.currentDate.week();
      case "monthly":
        return this.currentDate.month();
      case "yearly":
        return this.currentDate.year();
    }
  }

  nextPeriod() {
    switch (this.periodType) {
      case "daily":
        this.currentDate = this.currentDate.add(1, "day");
        return this;
      case "weekly":
        this.currentDate = this.currentDate.add(1, "week");
        return this;
      case "monthly":
        this.currentDate = this.currentDate.add(1, "month");
        return this;
      case "yearly":
        this.currentDate = this.currentDate.add(1, "year");
        return this;
    }
  }

  getPeriodNow(periodType: TaskPeriod) {
    const now = dayjs(new Date());

    switch (periodType) {
      case "daily":
        return now.dayOfYear();
      case "weekly":
        return now.week();
      case "monthly":
        return now.month();
      case "yearly":
        return now.year();
    }
  }
}
