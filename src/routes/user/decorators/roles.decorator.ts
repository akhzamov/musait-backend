import { SetMetadata } from '@nestjs/common';
import { Role } from '@app/routes/user/enums/roles.enum';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
