import React, { Fragment, useRef, useState } from 'react'
import { HiOutlineAtSymbol, HiOutlineLockClosed } from 'react-icons/hi'
import { BiLogIn } from 'react-icons/bi'
import Layout from '../layout'
import { InertiaLink, usePage, Head } from '@inertiajs/inertia-react'
import { Inertia } from '@inertiajs/inertia'
import route from 'ziggy'
const Login = () => {

    const { errors, general } = usePage().props;

    const logo = general.logo ? general.logo : "default.jpg";

    const emailRef = useRef();
    const passwordRef = useRef();

    const getLogin = (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        Inertia.post(route('login'), { email, password });
    }

    return (
        <Layout>
            <Fragment>
            <Head>
                <link rel="icon" type="image/svg+xml" href={"/storage/images/" + logo} />
            </Head>
                <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
                    <div className="flex items-center justify-center">
                        <InertiaLink
                        href={route('home')}
                        title="página inicial"
                        >
                        <img className="h-22" src={"storage/images/" + logo} alt={general.title} />
                        </InertiaLink>
                    </div>

                    <div className="relative mt-10 h-px bg-gray-300">

                        <div className="absolute left-0 top-0 flex justify-center w-full -mt-2">
                            <span className="bg-white px-4 text-xs text-gray-500 uppercase">Faça o login para acessar</span>
                        </div>
                    </div>
                    <div className="mt-10">
                        <form onSubmit={getLogin}>
                            <div className="flex flex-col mb-6">
                                <label htmlFor="email" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">E-mail:</label>
                                <div className="relative">
                                    <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                                        <HiOutlineAtSymbol className="text-2xl" />
                                    </div>
                                    <input
                                        ref={emailRef}
                                        id="email"
                                        type="text"
                                        name="email"
                                        className={`text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400
                                        ${errors.email ? 'border-red-500' : ''}`}
                                        placeholder="" />
                                </div>
                                {errors.email && <div className="text-md text-red-500 p-1">{errors.email}</div>}
                            </div>
                            <div className="flex flex-col mb-6">
                                <label htmlFor="password" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Senha:</label>
                                <div className="relative">
                                    <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                                        <span>
                                            <HiOutlineLockClosed className="text-2xl" />
                                        </span>
                                    </div>

                                    <input
                                        ref={passwordRef}
                                        id="password"
                                        type="password"
                                        name="password"
                                        className={`text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400
                                        ${errors.password ? 'border-red-500' : ''}`}
                                        placeholder="" />
                                </div>
                                {errors.password && <div className="text-md text-red-500 p-1">{errors.password}</div>}
                            </div>

                            <div className="flex items-center mb-6 -mt-4">
                                <div className="flex ml-auto">
                                    <a href="#" className="inline-flex text-xs sm:text-sm text-blue-500 hover:text-blue-700">Perdeu a senha?</a>
                                </div>
                            </div>

                            <div className="flex w-full">
                                <button
                                    type="submit"
                                    className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-500 hover:bg-blue-600 rounded py-2 w-full transition duration-150 ease-in"
                                >
                                    <span className="mr-2 uppercase">Entrar</span>
                                    <span>
                                        <BiLogIn className="text-2xl" />
                                    </span>
                                </button>
                            </div>
                        </form>
                    </div>

                </div>

            </Fragment>
        </Layout>
    )
}

export default Login

