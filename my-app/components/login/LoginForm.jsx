import React, { useEffect, useState } from "react";
import styles from "styles/Login.module.css";
import Router from "next/router";

import Image from "next/image";
import axios from "axios";
const LoginFrom = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [login, setLogin] = useState(false)

    // useEffect(() => {
    //     const userObj = localStorage.getItem('girnarUser')

    //     if (userObj) {
    //         const girnarUser = JSON.parse(userObj)

    //         dispatch(serUser(girnarUser))
    //         Router.push('/')
    //     }
    // })

    const handleSubmit = async (event) => {
        event.preventDefault();


        // const response = await fetch(
        //     "http://18.139.85.219:8088/api/v1/user/authenticate",
        //     {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //         body: JSON.stringify({ email, password }),
        //     }
        // );
        const response = await axios.post('http://18.139.85.219:8088/api/v1/user/authenticate', {
            email,
            password
        })
        console.log(response.data)
        const { access_token, refresh_token, role, userName, id } = response.data;

        if (response.status === 200) {
            // If the login was successful, redirect to the home page

            const girnarUser = { access_token, refresh_token, role, userName, id }
            localStorage.setItem('girnarUser', JSON.stringify(girnarUser))


            Router.push('/vendor')
        } else {
            // If there was an error, display the error message
            console.log('error');
        }
        // dispatch(setUser({ access_token, refresh_token, role, userName, id }))
    };
    return <div className={styles.main}>


        {/* <htmlform className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 "> */}

        <form onSubmit={handleSubmit} className="bg-gray-800 bg-opacity-30 w-[35rem] h-[30rem] rounded px-8 pt-6 pb-8" method="Post" >
            <div className="flex flex-col py-9">


                <Image

                    src="/girnar_circle_white.png"
                    alt="Picture of the author"
                    width={100}
                    height={100}
                />

                <h1 className="text-3xl text-white flex item-center justify-center  bold">Login your Account</h1>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlform="username">
                    Email
                </label>

                <input value={email} onChange={(e) => setEmail(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="Email" type="Email" placeholder="Email" />
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlform="password">
                    Password
                </label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} className="shadow appearance-none border border-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
                {/* <p className="text-red-500 text-xs italic">Please choose a password.</p> */}
            </div>
            <div className="flex items-center flex-col flex-end  justify-between">
                <button className="bg-gradient-to-r from-orange-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                    login
                </button>

            </div>
        </form>
        <p className="text-center text-black-500 text-xl">
            &copy;2023 - PT Sundish Travel Indah -All rights reserved
        </p>
    </div>


};
export default LoginFrom;

