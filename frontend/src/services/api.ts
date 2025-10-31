import axios from 'axios'

const API = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api' })

export const getExperiences = () => API.get('/experiences').then(r => r.data)
export const getExperience = (id: number) => API.get(`/experiences/${id}`).then(r => r.data)
export const validatePromo = (code: string) => API.post('/promo/validate', { code }).then(r => r.data)
export const createBooking = (payload: any) => API.post('/bookings', payload).then(r => r.data)

export default API
