export enum Campus {
	MM = 'MM',
	PD = 'PD'
}

export interface UserData {
	name: string;
	token: string;
	campus: Campus;
	class: string;
}

export type CandidateType = {
      president: string;
      vice_president: string;
      visi: string;
      misi: string[];
      image: string;
      campus: Campus;
};

export enum ApiError {
	BadRequest = 'BadRequest', // 400
	Unauthorized = 'Unauthorized', // 401
	NotFound = 'NotFound', // 404
	Conflict = 'Conflict', // 409
	TooManyRequests = 'TooManyRequests', // 429
	ServerError = 'ServerError', // 500
	ServiceUnavailable = 'ServiceUnavailable', // 503
	Error = 'Error' // Default
}

export type VoterType = {
      name: string;
      campus: Campus;
      class: string,
      token: string
};


// --------------- API Response Type
export interface ResetVoteResponseType {
	new_token: string;
}

export type GetTokensResponseType = {
	[campus_name in Campus]: {
		[voter_name: string]: string
	}
}

export type VoterName = string;

export type DetailVoteStatsResponseType = {
      [CandidateName: string]: VoterName
}

export type VotesCount = number;

export type VoteStatsResponseType = {
      [CampusName in Campus]: {
            [CandidateName: string]: VotesCount
      }
};


export type GetCandidateResponseType = CandidateType[];


export type VoterToken = string;

export type VoterTokenType = {
      [CampusName in Campus]: {
            [VoterName: string]: VoterToken
      }
}

export type NumOfVotersType = {
      [CampusName in Campus]: number
}
