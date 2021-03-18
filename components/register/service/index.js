import { apiEndpoint } from '../../../services/endpoint';
import { RegisterService } from './register.service';
export const registerService = new RegisterService(apiEndpoint);