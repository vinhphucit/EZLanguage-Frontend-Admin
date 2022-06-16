import type { GetSession, Handle } from '@sveltejs/kit';
export const handle: Handle = async ({ event, resolve }) => {
	
	
	// console.log("Default Hook");
	// console.log(JSON.stringify(event));
	// (event.locals as any).user = '123321'
	const response = await resolve(event);

	return response;
};

// export const getSession: GetSession = async ({ locals }) => {	
	
// 	return {
// 		user: 'Tran Vinh Phuc'
// 	};
// };
