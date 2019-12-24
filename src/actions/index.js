import jsonPlaceholder from '../apis/jsonPlaceholder';
import _ from 'lodash';
import { getAllByAltText } from '@testing-library/dom';

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
    await dispatch(fetchPosts());
    const userIds = _.uniq(_.map(getState().posts, 'userId'))
    userIds.forEach(id => dispatch(fetchUsers(id)))

    //alternative way -refactor
    // _.chain(getState().posts)
    // .map('userId')
    // .uniq()
    // .forEach(id => dispatch(fetchUsers(id)))
    // .value()  // execute
}

export const fetchPosts = () => async dispatch => {
    const response = await jsonPlaceholder.get('/posts');
    dispatch({type: 'FETCH_POSTS', payload: response.data })
}

//#1
// By using lodash, you can avoid overfetching users many times. But con is you can only fetch once. If you need to fetch user again you need to create anothe function
//export const fetchUsers = (id) => dispatch => {
    // const response = await jsonPlaceholder.get(`/users/${id}`);
    // dispatch({ type: 'FETCH_USERS', payload: response.data })   
    //_fetchUser(id, dispatch)
//}

// const _fetchUser = _.memoize(async(id, dispatch) => {
//     const response = await jsonPlaceholder.get(`/users/${id}`);
//     dispatch({ type: 'FETCH_USERS', payload: response.data }) 
// })

// #2
export const fetchUsers = (id) => async dispatch => {
    const response = await jsonPlaceholder.get(`/users/${id}`);
     dispatch({ type: 'FETCH_USERS', payload: response.data })   
}

