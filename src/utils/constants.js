import {
  todo,
  urgent,
  high,
  low,
  medium,
  noPriority,
  inProgress,
  backlog,
  done,
  cancelled,
} from '../assets';



export const GROUP_BY = {
  STATUS: 'status',
  USER: 'user',
  PRIORITY: 'priority'
};

export const SORT_BY = {
  PRIORITY: 'priority',
  TITLE: 'title'
};

export const STATUS = {
  BACKLOG: "Backlog",
  TODO: "Todo",
  IN_PROGRESS: "In progress",
  DONE: "Done",
  CANCELLED: "Cancelled"
};

export const STATUS_ICONS = {
  "Backlog": backlog,
  "Todo": todo,
  "In Progress": inProgress,
  "Done": done,
  "Cancelled": cancelled
};



export const PRIORITY_ICONS = {
  4: urgent,
  3: high,
  2: medium,
  1: low,
  0: noPriority
}; 

export const PRIORITY_LEVELS = {
  4: 'Urgent',
  3: 'High',
  2: 'Medium',
  1: 'Low',
  0: 'No priority'
};

