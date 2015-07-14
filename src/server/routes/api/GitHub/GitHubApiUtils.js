'use strict';

import request from 'axios';

export function getAllPagedResults(apiResult) {
	return apiResult
		.then(results=> {
			var paginationLink = parseLink(results.headers.link);
			var results = results.data;
			if (!paginationLink) {
				return Promise.resolve(results);
			}
			return getAllPagedResults(request.get(paginationLink))
				.then(pagedResults=>results.concat(pagedResults));
		});
}

export function parseLink(linkHeader) {
	var match = /(https:\/\/api.github.com\/.*&page=[1-9][0-9]*?)>[;]\srel="next"/.exec(linkHeader);
	console.log('matches', match);
	if (!match) {
		return null;
	}
	return match[1];
}