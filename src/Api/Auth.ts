/* eslint-disable @typescript-eslint/no-explicit-any */
import Api from './Api';
import { toast } from 'react-toastify';

class Auth extends Api {
    static login(data: any,submit:(res:any) => void) {
        this.post('/login',data).then(res => {
            submit(res);
        }).catch((er) => toast.error(er.message))
    }
    static register(data: any,submit:(res:any) => void) {
        this.post('/register',data).then(res => {
            submit(res);
        }).catch((er) => toast.error(er.message))
    }
    static logout(){
        this.post('/logout').then(() =>{})
    }
}
export default Auth