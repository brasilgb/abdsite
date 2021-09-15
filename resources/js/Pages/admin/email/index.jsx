import React, { Fragment, useState, useEffect, useRef } from 'react';
import { HiDocumentDuplicate, HiCheck, HiChevronDoubleLeft, HiSave, HiExclamation } from 'react-icons/hi';
import route from 'ziggy';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink, Head, usePage } from '@inertiajs/inertia-react';
import Layout from '../../../components/admin/layout';

const Email = ({email, emailTitle, success}) => {

    const { errors, general } = usePage().props

    // const [values, setValues] = useState({
    //     Emailname: null,
    // });

    const hostRef = useRef();
    const portRef = useRef();
    const securityRef = useRef();
    const userRef = useRef();
    const passwordRef = useRef();

    useEffect(() => {
        hostRef.current.value = email.host ? email.host : '';
        portRef.current.value = email.port ? email.port : '';
        securityRef.current.value = email.security ? email.security : '';
        userRef.current.value = email.user ? email.user : '';
        passwordRef.current.value = email.password ? email.password : '';
    }, [])

    const updateEmail = (e) => {
        e.preventDefault();
        const host = hostRef.current.value;
        const port = portRef.current.value;
        const security = securityRef.current.value;
        const user = userRef.current.value;
        const password = passwordRef.current.value;
        Inertia.put(route('email.alterar', 1), { host, port, security, user, password });
    };

    return (
        <Fragment>
            <Layout>
                <Head title={ general.title + ' - ' + emailTitle} />
                <div className="rounded py-2 px-4 text-gray-900 bg-gray-100 shadow">

                    <div className="p-2 mt-2 flex bg-gray-200 rounded-t-md border border-gray-300">
                        <h1 className="text-2xl text-gray-600 flex items-center">
                            <HiDocumentDuplicate /> Configurações de E-mail
                        </h1>
                    </div>

                    {success &&
                        <div className="flex items-center mt-2 p-2 bg-green-200 border border-green-300 text-gray-600 rounded-md">
                            <span className="mt-1 text-xl"><HiCheck /></span>{success}
                        </div>
                    }

                    <div className="py-4 flex border-b border-gray-300">

                    </div>

                    <form onSubmit={updateEmail} className="py-4" autoComplete="off">

                        <div className="w-8/12 pt-2">
                            <label><span className="text-gray-500">Servidor SMTP</span></label>
                            <input
                                ref={hostRef}
                                type="text"
                                className="form-input text-gray-500 mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                id="host"
                                placeholder=""
                            />
                            {errors.host && <div className="p-2 border border-t-0 border-red-200 text-sm flex items-center w-full bg-yellow-100 text-red-500"><HiExclamation className="text-md mt-1" /> {errors.host}</div>}
                        </div>

                        <div className="w-8/12 pt-2">
                            <label><span className="text-gray-500">Porta SMTP</span></label>
                            <input
                                ref={portRef}
                                type="text"
                                className="form-input text-gray-500 mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                id="port"
                                placeholder=""
                            />
                            {errors.port && <div className="p-2 border border-t-0 border-red-200 text-sm flex items-center w-full bg-yellow-100 text-red-500"><HiExclamation className="text-md mt-1" /> {errors.port}</div>}
                        </div>

                        <div className="w-8/12 pt-2">
                            <label><span className="text-gray-500">Segurança</span></label>
                            <input
                                ref={securityRef}
                                type="text"
                                className="form-input text-gray-500 mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                id="security"
                                placeholder=""
                            />
                            {errors.security && <div className="p-2 border border-t-0 border-red-200 text-sm flex items-center w-full bg-yellow-100 text-red-500"><HiExclamation className="text-md mt-1" /> {errors.security}</div>}
                        </div>

                        <div className="w-8/12 pt-2">
                            <label><span className="text-gray-500">Usuário (email)</span></label>
                            <input
                                ref={userRef}
                                type="text"
                                className="form-input text-gray-500 mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                id="user"
                                placeholder=""
                            />
                            {errors.user && <div className="p-2 border border-t-0 border-red-200 text-sm flex items-center w-full bg-yellow-100 text-red-500"><HiExclamation className="text-md mt-1" /> {errors.user}</div>}
                        </div>

                        <div className="w-8/12 pt-2">
                            <label><span className="text-gray-500">Senha</span></label>
                            <input
                                ref={passwordRef}
                                type="password"
                                className="form-input text-gray-500 mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                id="password"
                                placeholder=""
                            />
                            {errors.password && <div className="p-2 border border-t-0 border-red-200 text-sm flex items-center w-full bg-yellow-100 text-red-500"><HiExclamation className="text-md mt-1" /> {errors.password}</div>}
                        </div>

                        <div className="flex items-center w-full border-t border-gray-300 pt-4 mt-4">
                            <button
                                className="flex items-center md:mb-0 bg-blue-500 hover:bg-blue-700 px-5 py-2 text-sm shadow-sm border-2 border-white text-gray-100 rounded-lg hover:shadow-lg">
                                <HiSave className="text-xl" /> Salvar
                            </button>
                        </div>
                    </form>
                </div>
            </Layout>
        </Fragment>
    )
}

export default Email;
