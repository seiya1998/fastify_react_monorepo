import type { GetUserResponse } from './schema';
import type { Prisma } from '@/lib';
import type { Result } from '@/types';

/**
 * IDからユーザーを取得する
 */
export const getUserFromDB = async ({
  userId,
}: {
  userId: string;
}): Promise<
  Result<GetUserResponse[200], { errorCode: 630 }>
> => {
  try {
    const user = {
      id: userId,
      name: 'test'
    }
    return {
      success: true,
      data: user
    }
  } catch (error) {
    return { success: false, error: { errorCode: 630 } };
  }
};
