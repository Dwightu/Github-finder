import { createContext, useReducer } from "react";
import { createRenderer } from "react-dom/test-utils";

import githubReducer from "./GithubReducer";

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL

// const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN


export const GithubProvider = ({ children }) => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false
    }

    const [state, dispatch] = useReducer(githubReducer, initialState)

    //get a single user
    const searchUser = async (login) => {


        setLoading()
        const responce = await fetch(`${GITHUB_URL}/users/${login}`, {
            // headers: {
            //     Authorization: `token ${GITHUB_TOKEN}`
            // }
        })

        if (responce.status === 404) {
            window.location = '/notfound'
        }
        else {
            const data = await responce.json()
            dispatch({
                type: 'GET_USER',
                payload: data
            })
        }

        // setLoading(false)
    }

    //Get Search Result
    const searchUsers = async (text) => {
        setLoading()
        const params = new URLSearchParams(
            {
                q: text
            }
        )
        const responce = await fetch(`${GITHUB_URL}/search/users?${params}`, {
            // headers: {
            //     Authorization: `token ${GITHUB_TOKEN}`
            // }
        })

        const { items } = await responce.json()
        console.log(items)
        setTimeout(() => {
            dispatch({
                type: 'GET_USERS',
                payload: items,
            })
        }, 500);
        // setLoading(false)
    }

    //get user repos
    const getUserRepos = async (login) => {
        setLoading()

        const params = new URLSearchParams(
            {
                sort: 'created',
                per_page: 10
            }
        )

        const responce = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, {
            // headers: {
            //     Authorization: `token ${GITHUB_TOKEN}`
            // }
        })


        const data = await responce.json()
        console.log(data)
        dispatch({
            type: 'GET_REPOS',
            payload: data
        })

        // setLoading(false)
    }

    //Create Clear Function
    const clearUsers = () => {
        dispatch({
            type: 'DELETE_USERS',
            payload: []
        })
    }


    //Set Loading
    const setLoading = () => dispatch({
        type: 'SET_LOADING'
    })

    return <GithubContext.Provider value={{ getUserRepos, repos: state.repos, user: state.user, users: state.users, loading: state.loading, searchUsers, clearUsers, getUser: searchUser }}>{children}</GithubContext.Provider>

}

export default GithubContext