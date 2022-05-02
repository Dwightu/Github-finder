import { useEffect, useState } from 'react'
import Spinner from '../layout/Spinner'

import UserItem from './UserItem'

function UserResults() {

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        const responce = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users`, {
            headers: {
                Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`
            }
        })

        setTimeout(() => { setLoading(false); }, 500);
        const data = await responce.json()
        setUsers(data)
        // setLoading(false)
    }
    if (!loading) {
        return (
            <div className='grid grid-cols-1 gap-8 xl:grid-colds-4 lg:grid-cols-3 md:grid-cols-2'>
                {users.map((user) => (
                    <h3>
                        <UserItem key={user.id} user={user} />
                    </h3>
                ))}
            </div>
        )
    } else {
        return <h3><Spinner /></h3>
    }


}

export default UserResults