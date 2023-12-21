import axios from 'axios';

const client = axios.create({
	baseURL: 'https://run.mocky.io/v3/2ed8c698-1b23-4d64-836f-9ef92dcae818',
});

export default client;
