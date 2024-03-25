import { RoomServiceClient } from 'livekit-server-sdk';

export class LiveKitWebRTCService {
  protected readonly roomServiceClient: RoomServiceClient;

  constructor() {
    const host = '';
    const clientId = '';
    const clientSecret = '';
    this.roomServiceClient = new RoomServiceClient(
      host,
      clientId,
      clientSecret,
    );
  }

  async createRoom(name: string): Promise<void> {
    const room = await this.roomServiceClient.createRoom({ name });
  }
}
