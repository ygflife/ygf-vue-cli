import axios from 'axios';
export default axios.create({
    baseURL: 'http://'+window.location.host+'/src/APPcommon/json/',
    timeout: 1000,
});
