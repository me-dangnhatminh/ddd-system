export interface IRoomPermissions {
  canKick: boolean;
  canBan: boolean;
  canLock: boolean;
  canApprove: boolean;
  canReject: boolean;
  canJoin: boolean;
}

export interface ICanKickPermissions extends IRoomPermissions {
  canKick: true;
}
export interface ICanBanPermissions extends IRoomPermissions {
  canBan: true;
}
export interface ICanLockPermissions extends IRoomPermissions {
  canLock: true;
}
export interface ICanApprovePermissions extends IRoomPermissions {
  canApprove: true;
}
export interface ICanRejectPermissions extends IRoomPermissions {
  canReject: true;
}
export interface ICanJoinPermissions extends IRoomPermissions {
  canJoin: true;
}
