export interface AuthUser {
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly birthDate: Date | undefined;
  readonly gender: string;
  readonly accessToken: string;
  readonly userRole: string;
}
