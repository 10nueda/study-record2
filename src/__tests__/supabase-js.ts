export const createClient = () => ({
	from: () => ({
		select: () => ({ data: [], error: null }),
		insert: () => ({ data: [], error: null }),
		delete: () => ({ data: [], error: null }),
	}),
});
// src/__tests__/supabase-js.ts
describe("supabase mock", () => {
	it("should be defined", () => {
		expect(true).toBe(true);
	});
});
