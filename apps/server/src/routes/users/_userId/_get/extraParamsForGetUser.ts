import type { FastifyRequest } from 'fastify';
import { GetUserRequest } from './schema';
import type { Result } from '@/types';
import { validateCuid } from '@/utils';

export const extraParamsForGetUser = (
  request: FastifyRequest<GetUserRequest>
): Result<{ userId: string }, { errorCode: 400 }> => {
  const { userId } = request.params;

  return validateCuid(userId) && userId != null
    ? { success: true, data: { userId } }
    : { success: false, error: { errorCode: 400 } };
};
