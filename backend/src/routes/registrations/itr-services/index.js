import { createServiceFlowRouter } from '../shared/serviceFlowRouter.js';
import { ITR_MODULE_TYPE, getItrService } from './service.js';

export default createServiceFlowRouter({
  moduleType: ITR_MODULE_TYPE,
  expertLabel: 'income tax',
  getService: getItrService,
});
