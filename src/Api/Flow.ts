/* eslint-disable @typescript-eslint/no-explicit-any */
import Api from "./Api";

class Flow extends Api{
    static chat(data:any,submit:(res:any) => void) {
        this.post('/flow_uni',data).then((res) => {
            submit(res.data)
        })
    }
}
export default Flow;