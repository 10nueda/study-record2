// src/setupTests.ts
import "@testing-library/jest-dom";

// Supabase のモック
jest.mock("@supabase/supabase-js", () => {
	return {
		createClient: () => ({
			from: jest.fn(() => ({
				select: jest.fn().mockResolvedValue({ data: [], error: null }),
				insert: jest.fn().mockResolvedValue({ data: [], error: null }),
			})),
		}),
	};
});
