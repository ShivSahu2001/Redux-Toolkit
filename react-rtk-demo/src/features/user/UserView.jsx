import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux"
import {fetchUsers} from "./userSlice"
export const UserView = () => {
   const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
   useEffect(() => {
    
   dispatch(fetchUsers())
    
   }, []);

    return (
        <div>
            <h2>List of Users</h2>
            {user.loading && <h2>Loading...</h2>}
            {!user.loading && user.error ? <h2>Error: {user.error}</h2> : null}
            {!user.loading && user.users.length ? (
                <ul>
                    {
                        user.users.map((user) => (
                            <li key={user.id}> {user.name}</li>
                        ))
                    }
                </ul>
            ) : null}
        </div>
    )
}
