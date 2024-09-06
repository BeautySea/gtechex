// https://quick-apply-b4e936c5c50c.herokuapp.com/stripe
import axios from 'axios';
import ENUM from '../service/enum';

const token = localStorage.getItem('authToken') || '';


export default axios.create({
	// baseURL: import.meta.env.VITE_API_BASE_URL,
	baseURL: ENUM.STRIPE_BASE_URL,
	// withCredentials: true,
	headers: {
		"Content-Type": "application/json",
		// Authorization: 'Secret ' + import.meta.env.VITE_SECRET,
		"Accept": "application/json",
		
	},
});