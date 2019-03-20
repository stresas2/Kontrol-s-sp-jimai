// helper.js
import axios from 'axios';

// CORS enabled apikey
const apikey = '5c3458a366292476821c9da6';

// Autotrade delay
const trade_delay = 10000; // millis

// REST endpoint
let restdb = axios.create({
    baseURL: 'https://kontrole-6c4b.restdb.io',
    //timeout: 5000,
    headers: { 'x-apikey': apikey }
});
// Eventsource endpoint
const realtimeURL = `https://kontrole-6c4b.restdb.io/realtime?apikey=${apikey}`

export { apikey, restdb, realtimeURL, trade_delay };
