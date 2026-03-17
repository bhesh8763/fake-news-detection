import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
})

export const analyzeArticle = (text) =>
  api.post('/analyze/', { text }).then(res => res.data)

export default api