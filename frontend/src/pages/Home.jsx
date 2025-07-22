import React from 'react'
import SideBar from '../components/SideBar'
import Feed from '../components/Feed'
import RightMenu from '../components/RightMenu'
import Navbar from '../components/Navbar'

const Home = () => {
    return (
        <div className='bg-[#f7f7f6]'>
            <Navbar />
            <div className='w-full flex justify-center items-center gap-2 p-4'>
                <SideBar />
                <Feed />
                <RightMenu />

            </div>
        </div>
    )
}

export default Home