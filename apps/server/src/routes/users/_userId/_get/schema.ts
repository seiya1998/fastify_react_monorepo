import { JSONSchema } from 'json-schema-to-ts';
import { GenerateRequestTypes, GenerateResponseTypes } from '@/types';

/**
 * GET: /users/:userId
 */
export const schemas = {
  get: {
    tags: ['user'],
    description: 'ユーザー詳細取得API',
    headers: {
      type: 'object',
      properties: {
        authorization: {
          type: 'string'
        },
        'x-device-id': {
          type: 'string'
        }
      }
    } as const satisfies JSONSchema,
    params: {
      type: 'object',
      properties: {
        userId: { type: 'string' },
      },
      required: ['userId']
    } as const satisfies JSONSchema,
    response: {
      200: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
        },
        required: ['id', 'name']
      } as const satisfies JSONSchema,
      400: {
        description: 'リクエストが不正です',
        type: 'object',
        properties: {
          error: { type: 'string' }
        },
        required: ['error']
      } as const satisfies JSONSchema,
      500: {
        description: 'サーバーエラー',
        type: 'object',
        properties: {
          error: { type: 'string', enum: ['Internal Server Error'] },
        },
        required: ['error']
      } as const satisfies JSONSchema
    }
  }
};

export type GetUserRequest = GenerateRequestTypes<typeof schemas.get>;

export type GetUserResponse = GenerateResponseTypes<
  typeof schemas.get.response
>;
