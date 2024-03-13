export class AlertWidgetGatewaySession {
  readonly serverId: string;
  readonly studioId: number;
  readonly connectedAt: Date;

  constructor(serverId: string, studioId: number) {
    this.serverId = serverId;
    this.studioId = studioId;
    this.connectedAt = new Date();
  }

  static createKey() {
    return ['gateway', 'alert-widget'].join(':');
  }
}
