import { requestGet, requestPost } from '../../../services/requests';

export class RegisterService {
    constructor(endpoint) {
        this.endpoint = 'http://10.0.2.2:5484';
    }

    register(param) {
        const url = this.operationUrl('/auth/register');
        param = param || {};
        return requestPost(url, param);
    }

    operationUrl(append) {
        return this.endpoint + append;
      }
}