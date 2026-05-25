export const prerender = false;

export const load = async ({ params }: { params: { page: string } }) => {
	return { slug: params.page };
};
