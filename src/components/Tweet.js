import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { formatTweet, formatDate } from '../utils/helpers';
import { TiArrowBackOutline, TiHeartOutline, TiHeartFullOutline } from 'react-icons/ti';
import { handleToggleTweet } from '../actions/tweets';

export default function Tweet({ id }) {
    const navigateTo = useNavigate();
    const dispatch = useDispatch();
    const { authedUser, tweet } = useSelector(({ authedUser, users, tweets }) => {
        const tweet = tweets[id];
        const parentTweet = tweet ? tweets[tweet.replyingTo] : null;

        return {
            authedUser,
            tweet: tweet ? formatTweet(tweet, users[tweet.author], authedUser, parentTweet) : null
        }
    });

    const handleLike = (e) => {
        e.preventDefault();
        dispatch(handleToggleTweet({
            id: tweet.id,
            hasLiked: tweet.hasLiked,
            authedUser
        }));
    }

    const toParent = (e, id) => {
        e.preventDefault();
        navigateTo(`/tweet/${id}`);
    }

    if (tweet === null) {
        return <p>This Tweet doesn't exist.</p>
    }

    const { name, avatar, timestamp, text, hasLiked, likes, replies, parent } = tweet;

    return (
        <Link to={`/tweet/${id}`} className="tweet">
            <img
                src={avatar}
                alt={`Avatar of ${name}`}
                className='avatar'
            />
            <div className='tweet-info'>
                <div>
                    <span>{name}</span>
                    <div>{formatDate(timestamp)}</div>
                    {parent && (
                        <button className="replying-to" onClick={(e) => toParent(e, parent.id)}>
                            Replying to @{parent.author}
                        </button>
                    )}
                    <p>{text}</p>
                </div>
                <div className="tweet-icons">
                    <TiArrowBackOutline className="tweet-icon" />
                    <span>{replies !== 0 && replies}</span>
                    <button className="heart-button" onClick={(e) => handleLike(e)}>
                        {hasLiked === true
                            ? <TiHeartFullOutline color="#e0245e" className="tweet-icon" />
                            : <TiHeartOutline className="tweet-icon" />}
                    </button>
                    <span>{likes !== 0 && likes}</span>
                </div>
            </div>
        </Link>
    )
}