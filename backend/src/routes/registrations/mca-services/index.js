import { createServiceFlowRouter } from '../shared/serviceFlowRouter.js';
import { MCA_MODULE_TYPE, getMcaService } from './service.js';

export default createServiceFlowRouter({
  moduleType: MCA_MODULE_TYPE,
  expertLabel: 'company law',
  getService: getMcaService,
});
