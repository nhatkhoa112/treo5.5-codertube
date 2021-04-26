import axios from 'axios'

const KEY = 'AIzaSyBXF8n59Ee7XdyNeEwCYSULhDMHe7letq4';

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params:{ 
        part: 'snippet',
        maxResults: 5,
        key: KEY
    }
});