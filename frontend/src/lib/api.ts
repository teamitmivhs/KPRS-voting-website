import { ApiError, type DetailVoteStatsResponseType, type GetCandidateResponseType, type GetTokensResponseType, type ResetVoteResponseType, type UserData, type VoteStatsResponseType } from "./types";

const BASE_URL = import.meta.env.BACKEND_API_BASE_URL || 'http://localhost:8080';

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                   Helper                                   */
/* -------------------------------------------------------------------------- */

/**
 * Helper to handle fetch requests with default headers and credentials
 * Returns Success Data (T) or ApiError enum
 */
async function request<T>(
	endpoint: string,
	method: 'GET' | 'POST' = 'GET',
	body?: unknown
): Promise<T | ApiError> {
	const url = `${BASE_URL}${endpoint}`;
	const headers: HeadersInit = {
		'Content-Type': 'application/json'
	};

	const options: RequestInit = {
		method,
		headers,
		credentials: 'include'
	};

	if (body) {
		options.body = JSON.stringify(body);
	}

	try {
		const response = await fetch(url, options);

		if (!response.ok) {
			switch (response.status) {
				case 400:
					return ApiError.BadRequest;
				case 401:
					return ApiError.Unauthorized;
				case 404:
					return ApiError.NotFound;
				case 409:
					return ApiError.Conflict;
				case 429:
					return ApiError.TooManyRequests;
				case 500:
					return ApiError.ServerError;
				case 503:
					return ApiError.ServiceUnavailable;
				default:
					return ApiError.Error;
			}
		}

		// Success case
		const text = await response.text();
		// If T is void, we might just return undefined, but to be safe casting the result:
		return text ? JSON.parse(text) : (undefined as T);
	} catch (error) {
		// Network errors or other fetch exceptions
		console.error('Network or Parse Error:', error);
		return ApiError.Error;
	}
}

/* -------------------------------------------------------------------------- */
/*                                API Functions                               */
/* -------------------------------------------------------------------------- */

export const api = {
	/**
	 * Get User Data
	 * Request: fullname, token
	 * Response: HTTP Status Only (void on success) or ApiError
	 */
	getUserData: async (fullname: string, token: string): Promise<UserData | ApiError> => {
		return request<UserData>(`/voter/get`, 'POST', { fullname, token });
	},

	/**
	 * Vote
	 * Request: candidate_fullname
	 * Response: HTTP Status Only (void on success) or ApiError
	 */
	vote: async (candidate_fullname: string): Promise<undefined | ApiError> => {
		return request<undefined>('/voter/vote', 'POST', { candidate_fullname });
	},

	/**
	 * Logout
	 * Request: (cookies only)
	 * Response: HTTP Status Only (void on success) or ApiError
	 */
	logout: async (): Promise<undefined | ApiError> => {
		return request<undefined>('/voter/logout', 'POST');
	},

	/**
	 * Check
	 * Request: (cookies only)
	 * Response: HTTP Status Only (void on success) or ApiError
	 */
	check: async (): Promise<undefined | ApiError> => {
		return request<undefined>('/voter/check', 'POST');
	},

	/**
	 * Admin Login
	 * Request: fullname, token
	 * Response: HTTP Status Only (void on success) or ApiError
	 */
	adminLogin: async (admin_id: string, admin_password: string): Promise<undefined | ApiError> => {
		return request<undefined>(`/admin/login`, 'POST', { admin_id, admin_password });
	},

	/**
	 * Reset Vote
	 * Request: voter_fullname (and cookies)
	 * Response: new_token or ApiError
	 */
	resetVote: async (voter_fullname: string): Promise<ResetVoteResponseType | ApiError> => {
		return request<ResetVoteResponseType>('/admin/reset', 'POST', { voter_fullname });
	},

	/**
	 * Get Token
	 * Request: (cookies only)
	 * Response: tokens maps or ApiError
	 */
	getTokens: async (): Promise<GetTokensResponseType | ApiError> => {
		return request<GetTokensResponseType>('/admin/token', 'GET');
	},

	/**
	 * Get Detailed Votes
	 * Request: (cookies only)
	 * Response: detailed votes data or ApiError
	 */
	getDetailedVotes: async (): Promise<DetailVoteStatsResponseType | ApiError> => {
		return request<DetailVoteStatsResponseType>('/admin/votes', 'GET');
	},

	/**
	 * Get Simple Votes
	 * Request: (cookies only)
	 * Response: simple votes data or ApiError
	 */
	getSimpleVotes: async (): Promise<VoteStatsResponseType | ApiError> => {
		return request<VoteStatsResponseType>('/admin/votes/simple', 'GET');
	},

	/**
	 * Get Simple Votes
	 * Request: (cookies only)
	 * Response: simple votes data or ApiError
	 */
	getCandidateData: async (): Promise<GetCandidateResponseType | ApiError> => {
		return request<GetCandidateResponseType>('/candidate', 'GET');
	},
};
