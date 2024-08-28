interface StrapiErrorsProps {
	message: string | null;
	name: string;
	status: string | null;
}

export function StrapiErrors({ error }: { error:string }) {
	return <div className="text-red-500 text-md font-semibold py-3">{error}</div>;
}