import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

export default async function (fastify: FastifyInstance) {
    fastify.get(
        '/',
        {},
        async (_: FastifyRequest, reply: FastifyReply) => {
            console.log('users/:userId OK!');
            return reply.code(200).send({ message: 'users/1' });
        }
    );
}