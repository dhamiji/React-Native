import { requestGet, requestPost } from '../../../services/requests';

export class LoginService {
    constructor(endpoint) {
        this.endpoint = 'http://10.0.2.2:5484';
    }

    login(param) {
        const url = this.operationUrl('/auth/login');
        param = param || {};
        return requestPost(url, param);
    }

    operationUrl(append) {
        return this.endpoint + append;
      }
}