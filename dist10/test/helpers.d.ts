import { HttpCachingProxy } from '@loopback/http-caching-proxy';
import { Todo } from '../src/models/index';
import { GeoPoint } from '../src/services/geocoder.service';
export declare function givenTodo(todo?: Partial<Todo>): Todo;
export declare const aLocation: {
    address: string;
    geopoint: GeoPoint;
    readonly geostring: string;
};
export declare function getProxiedGeoCoderConfig(proxy: HttpCachingProxy): any;
export { HttpCachingProxy };
export declare function givenCachingProxy(): Promise<HttpCachingProxy>;
