import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { RiHomeFill } from 'react-icons/ri';
import Logo from '../assets/logo.png';
import { categories } from '../utils/data';

const SideBar = ({user, closeToggle}) => {

    console.log(user)

    const isNotActiveStyle = "flex items-center px-5 gap-3  hover:text-teal-500   transition-all duration-100 ease-in-out capitalize";
    const isActiveStyle = "flex items-center px-5 gap-3 font-extrabold border-r-2 text-teal-500  border-black transition-all duration-100 ease-in-out capitalize";


    const handleCloseSideBar = () => {
        if(closeToggle) closeToggle(false);
    }
    return (
        <div className="bg-white flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar">
            <div className="flex flex-col">
                <Link 
                 to="/"
                 className="flex px-5 gap-2 my-6 pt-1 w-190 items-center"
                onClick={handleCloseSideBar}
                >
                    <img src={Logo} alt="logo" className="w-10" />
                    <p className="text-black font-bold">FullTime</p>
                </Link>
                <div className="flex flex-col gap-5">
                    <NavLink
                        to="/"
                        className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle }
                        onClick={handleCloseSideBar}
                    >
                    <RiHomeFill />
                    <p clasName="text-black">Meu Feed</p>
                    </NavLink>
                    <h3 className="mt-2 px-5 text-base 2x1:text-x1 text-black font-bold">Categorias</h3>
                    {categories.slice(0, categories.length -1).map((category) => (
                        <NavLink
                        to={`/category/${category.name}`}
                        className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle }
                        onClick={handleCloseSideBar}
                        key={category.name}
                        >
                        <img src={category.image} className="w-10 h-10 rounded-full" alt="categorias" />
                            <p>{category.name}</p>
                        </NavLink>
                    ))}
                </div>
            </div>
            {user && (
                <Link
                    to={`user-profile/${user._id}`}
                    className="flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3"
                    onClick={handleCloseSideBar}
                >
                <img src={user.image} alt={user.UserName} className="w-10 h-10 rounded-full" />
                <p>{user.userName}</p>
                </Link>
            )}
        </div>
    )
}

export default SideBar
