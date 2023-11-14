/* eslint-disable @typescript-eslint/no-explicit-any */
import Api from './Api';

class Auth extends Api {
    static login(data: any,submit:(res:any) => void) {
        this.post('/login',data).then(res => {
            submit(res);
        })
    }
    static register(data: any,submit:(res:any) => void) {
        this.post('/register',data).then(res => {
            submit(res);
        })
    }
}
export default Auth