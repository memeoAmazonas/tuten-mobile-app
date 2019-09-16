import request from 'superagent';
import  {urlTuten, appTuten} from "../utils/constant";
import booking from './booking';
const login = (email, password )=> {
    let result;
    request
        .put(urlTuten.concat(email))
        .set({ Accept: 'application/json' })
        .set({ password })
        .set({ app: appTuten })
        .then((response) => {
           result = response.body.sessionTokenBck;
           booking(result);
        })
        .catch(() => {
            alert('A ocurrido un error iniciando sesion ');
        });
    return result;
}
export default login;