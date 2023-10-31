export class Auth {
  constructor(
    public userId: string,
    public level: number,
    private tokenString: string,
    private expiresAt: Date,
    private issuedAt: Date,
    public name: string
  ) {}

  get token(): string {
    if (!this.expiresAt || new Date() > this.expiresAt) {
      return null;
    }
    return this.tokenString;
  }
}
