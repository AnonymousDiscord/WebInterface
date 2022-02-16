export enum LogType {
  JOIN, LEAVE, ROLE_ADD, ROLE_REMOVE
}

// eslint-disable-next-line 
export namespace LogType {
  export function getName(type: LogType) {
    switch (type) {
      case LogType.JOIN: return "Join";
      case LogType.LEAVE: return "Leave";
      case LogType.ROLE_ADD: return "Role Add";
      case LogType.ROLE_REMOVE: return "Role Remove";
      default: return null;
    }
  }

  export function toString(type: LogType): string {
    return LogType[type];
  }
}