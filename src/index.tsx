import { configure } from 'mobx';
export { default as RouterX, routerType } from './lib/index';

configure({ enforceActions: 'never' });
