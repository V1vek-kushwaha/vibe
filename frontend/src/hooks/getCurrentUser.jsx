import React, { useEffect } from 'react'
import axiosInstance from '../utils/axiosInstance'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/user.Slice'

const getCurrentUser = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const fatchUser = async () => {
            try {
                const result = await axiosInstance.get("/user/me")
                // console.log("check user data", result)
                dispatch(setUserData(result.data))
            } catch (error) {
                console.log(error);

            }
        }
        fatchUser()
    }, [])

}

export default getCurrentUser