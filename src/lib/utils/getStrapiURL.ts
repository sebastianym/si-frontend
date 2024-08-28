export const getStrapiURL = () => {

	if (process.env.NODE_ENV === 'production') {
		return process.env.NEXT_PUBLIC_STRAPI_API_URL;
	}

	if (process.env.NODE_ENV === 'development') {
		return 'http://localhost:1337/';
	}
}