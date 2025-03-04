import type { FastifyInstance } from 'fastify';
import { pipe } from 'ramda';
import { match } from 'ts-pattern';
import { extraParamsForGetUser } from './_get/extraParamsForGetUser';
import { getUserFromDB } from './_get/getUserFromDB';
import { GetUserRequest, GetUserResponse, schemas } from './_get/schema';
import { bypass, start, dbMiddleware } from '@/utils';

export default async function (fastify: FastifyInstance) {
  /*
   * GET /app/users/:userId
   */
  /* eslint-disable-next-line functional/no-expression-statements */
  fastify.get<{
    Headers: GetUserRequest['Headers'];
    Params: GetUserRequest['Params'];
    Reply: GetUserResponse;
  }>(
    '/',
    {
      schema: schemas['get']
    },
    async (request, reply) => {
      return pipe(
        start(extraParamsForGetUser(request)),
        bypass(getUserFromDB),
        async (result) =>
          match(await result)
            .with({ error: { errorCode: 400 } }, () => {
              return reply.code(400).send({ error: 'リクエストが不正です' });
            })
            .with({ error: { errorCode: 630 } }, () => {
              return reply.code(500).send({
                error: 'Internal Server Error'
              });
            })
            .with({ success: true }, ({ data }) => {
              return reply.code(200).send(data);
            })
            .exhaustive()
      )();
    }
  );
}
