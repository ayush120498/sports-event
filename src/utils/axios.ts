import { API_ENDPOINT } from '@Constants/index';
import axios from 'axios';

const client = axios.create({
	baseURL: API_ENDPOINT,
});

export default client;
