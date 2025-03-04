import { join } from 'path';
import autoLoad from '@fastify/autoload';
import type { FastifyInstance } from 'fastify';

export default async (fastify: FastifyInstance) => {
  /* eslint-disable-next-line functional/no-expression-statements */
  await fastify.register(autoLoad, {
    dir: join(__dirname, '../../routes'),
    routeParams: true,
    matchFilter: (path: string) => {
      const parts = path.split('/');
      const fileName = parts.at(-1);
      const fileBaseName = fileName?.split('.').at(-2);
      const excludedDirs = ['_get', '_post', '_put', '_patch', '_delete'];
      return fileBaseName === '_handlers' && !parts.some(part => excludedDirs.includes(part));
    }
  });
};
