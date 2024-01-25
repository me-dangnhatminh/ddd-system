export interface IRoomPermission {
  canJoin: boolean;
  canChat: boolean;
  canShareScreen: boolean;
  canRecord: boolean;
  canKick: boolean;
  canInvite: boolean;
  canManageParticipants: boolean;
}

export interface IRoomPermissionFactory {
  create(data?: {
    canJoin?: boolean;
    canChat?: boolean;
    canShareScreen?: boolean;
    canRecord?: boolean;
    canKick?: boolean;
    canInvite?: boolean;
    canManageParticipants?: boolean;
  }): IRoomPermission;
}

export class RoomPermisions implements IRoomPermission, IRoomPermissionFactory {
  private constructor(
    public readonly canJoin: boolean,
    public readonly canChat: boolean,
    public readonly canShareScreen: boolean,
    public readonly canRecord: boolean,
    public readonly canKick: boolean,
    public readonly canInvite: boolean,
    public readonly canManageParticipants: boolean,
  ) {}
  create(data?: {
    canJoin?: boolean;
    canChat?: boolean;
    canShareScreen?: boolean;
    canRecord?: boolean;
    canKick?: boolean;
    canInvite?: boolean;
    canManageParticipants?: boolean;
  }): RoomPermisions {
    return new RoomPermisions(
      data?.canJoin ?? false,
      data?.canChat ?? false,
      data?.canShareScreen ?? false,
      data?.canRecord ?? false,
      data?.canKick ?? false,
      data?.canInvite ?? false,
      data?.canManageParticipants ?? false,
    );
  }
}
