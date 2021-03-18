import { apiEndpoint } from '../../../services/endpoint';
import { LoginService } from './login.service';
export const loginService = new LoginService(apiEndpoint);