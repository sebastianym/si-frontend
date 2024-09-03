export const getStrapiURL = () => {

	if (process.env.NODE_ENV === 'production') {
		return 'http://localhost:1337/'
	}

	if (process.env.NODE_ENV === 'development') {
		return 'http://localhost:1337/';
	}
}