import { Exclude, Expose } from 'class-transformer';

export class UserEntity {
  id: number;
  email: string;
  name: string;
  role: string;

  @Exclude()
  password: string;

  @Expose()
  get RoleWithName(): string {
    return `${this.role}: ${this.name}`;
  }

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
