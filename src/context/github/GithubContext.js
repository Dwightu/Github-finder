import { createContext, useReducer } from "react";

import githubReducer from "./GithubReducer";

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL

// const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN


export const GithubProvider = ({ children }) => {
    const initialState = {
        users: [],
        loading: false

    }

    const [state, dispatch] = useReducer(githubReducer, initialState)


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

    return <GithubContext.Provider value={{ users: state.users, loading: state.loading, searchUsers, clearUsers }}>{children}</GithubContext.Provider>

}

export default GithubContext