export function ZodErrors({ error }: { error: string[] }) {
	if (!error) return null;
	return error.map((err: string, index: number) => (
	  <div key={index} className="text-black/50 text-xs py-2">
		{err}
	  </div>
	));
  }