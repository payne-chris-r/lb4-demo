import { ApplicationConfig } from '@loopback/core';
import { RestApplication } from '@loopback/rest';
import { MySequence } from './sequence';
import { GeocoderServiceProvider } from './services';


/* tslint:disable:no-unused-variable */
// Binding and Booter imports are required to infer types for BootMixin!
import { BootMixin, Booter, Binding } from '@loopback/boot';

// juggler imports are required to infer types for RepositoryMixin!
import {
  Class,
  Repository,
  RepositoryMixin,
  juggler,
} from '@loopback/repository';
/* tslint:enable:no-unused-variable */

export class LoopbackTestApplication extends BootMixin(
  RepositoryMixin(RestApplication),
) {
  constructor(options?: ApplicationConfig) {
    super(options);

    // Set up the custom sequence
    this.sequence(MySequence);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
    this.setupServices();
  }

  setupServices() {
    this.service(GeocoderServiceProvider);
  }

  // TODO(bajtos) app.service should be provided either by core Application
  // class or a mixin provided by @loopback/service-proxy
  // See https://github.com/strongloop/loopback-next/issues/1439
  service<T>(provider: Constructor<Provider<T>>) {
    const key = `services.${provider.name.replace(/Provider$/, '')}`;
    this.bind(key).toProvider(provider);
  }

  // async start() {
  //   await super.start();

  //   const server = await this.getServer(RestServer);
  //   const port = await server.get<number>('rest.port');
  //   console.log(`Server is running at http://127.0.0.1:${port}`);
  //   console.log(`Try http://127.0.0.1:${port}/ping`);
  // }
}
