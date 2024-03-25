export interface IMeeting {}

export interface IMeetingRepository {
  createMeeting(): IMeeting;
  getMeeting(): IMeeting;
  updateMeeting(): IMeeting;
  deleteMeeting(): IMeeting;
}
