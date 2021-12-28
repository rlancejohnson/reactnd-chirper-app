export const RECEIVE_TWEETS = 'RECIEVE_TWEETS';

export function receiveTweets(tweets) {
    return {
        type: RECEIVE_TWEETS,
        tweets
    }
}