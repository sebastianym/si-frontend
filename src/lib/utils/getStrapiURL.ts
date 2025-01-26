export const getStrapiURL = () => {

	if (process.env.NODE_ENV === 'production') {
		return 'https://si-strapi-backend.onrender.com/'
	}

	if (process.env.NODE_ENV === 'development') {
		return 'https://si-strapi-backend.onrender.com/';
	}
}