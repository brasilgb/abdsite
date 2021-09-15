import React, { Fragment, useRef, useState } from 'react';
import { HiDocumentDuplicate, HiCheck, HiChevronDoubleLeft, HiSave, HiExclamation } from 'react-icons/hi';
import route from 'ziggy';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink, Head, usePage } from '@inertiajs/inertia-react';
import Layout from '../../../components/admin/layout';

const Create = ({ success, userTitle, error }) => {

    const { errors, general } = usePage().props

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const password_confirmationRef = useRef();
    const ruleRef = useRef();
    const activeRef = useRef();

    const saveData = (e) => {
        e.preventDefault();
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const password_confirmation = password_confirmationRef.current.value;
        const rule = ruleRef.current.value;
        const active = activeRef.current.checked;

        Inertia.post(route('usuario.store'), { name, email, password, password_confirmation, rule, active });
    };

    return (
        <Fragment>
            <Layout>
                <Head title={ general.title + ' - ' + userTitle} />
                <div className="rounded py-2 px-4 text-gray-900 bg-gray-100 shadow">

                    <div className="p-2 mt-2 flex bg-gray-200 rounded-t-md border border-gray-300">
                        <h1 className="text-2xl text-gray-600 flex items-center">
                            <HiDocumentDuplicate /> Usuários
                        </h1>
                    </div>

                    {success &&
                        <div className="flex items-center p-2 mt-2 bg-green-200 border border-green-300 text-gray-600 rounded-md">
                            <span className="mt-1 text-xl"><HiCheck /></span>{success}
                        </div>
                    }

                    <div className="py-4 flex border-b border-gray-300">
                        <InertiaLink
                            as="button"
                            type="button"
                            href={route('usuario.index')}
                            className="flex items-center mb-2 md:mb-0 bg-blue-500 hover:bg-blue-700 px-5 py-2 text-sm shadow-sm border-2 border-white text-gray-100 rounded-lg hover:shadow-lg">
                            <HiChevronDoubleLeft className="text-xl" /> Voltar
                        </InertiaLink>
                    </div>

                    <form onSubmit={saveData} className="py-4" autoComplete="off">

                    <div className="pt-2">
                            <label><span className="text-gray-500">Nome</span></label>
                            <input
                                ref={nameRef}
                                type="text"
                                className="form-input text-gray-500 mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                id="name"
                                placeholder=""
                            />
                            {errors.name && <div className="p-2 border border-t-0 border-red-200 text-sm flex items-center w-full bg-yellow-100 text-red-500"><HiExclamation className="text-md mt-1" /> {errors.name}</div>}
                        </div>

                        <div className="pt-2">
                            <label><span className="text-gray-500">E-mail</span></label>
                            <input
                                ref={emailRef}
                                type="email"
                                className="form-input text-gray-500 mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                id="email"
                                placeholder=""
                            />
                            {errors.email && <div className="p-2 border border-t-0 border-red-200 text-sm flex items-center w-full bg-yellow-100 text-red-500"><HiExclamation className="text-md mt-1" /> {errors.email}</div>}
                        </div>

                        <div className="pt-2">
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

                        <div className="pt-2">
                            <label><span className="text-gray-500">Repita a senha</span></label>
                            <input
                                ref={password_confirmationRef}
                                type="password"
                                className="form-input text-gray-500 mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                id="password_confirmation"
                                placeholder=""
                            />
                            {errors.password_confirmation && <div className="p-2 border border-t-0 border-red-200 text-sm flex items-center w-full bg-yellow-100 text-red-500"><HiExclamation className="text-md mt-1" /> {errors.password_confirmation}</div>}
                        </div>

                        <div className="pt-2">
                            <label><span className="text-gray-500">Acesso</span></label>
                            <select
                                ref={ruleRef}
                                className="form-input text-gray-500 mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                id="rule"
                            >
                                <option value="0">Selecione acesso</option>
                                <option value="1">Administrador</option>
                                <option value="2">Usuário</option>
                            </select>
                            {errors.rule && <div className="p-2 border border-t-0 border-red-200 text-sm flex items-center w-full bg-yellow-100 text-red-500"><HiExclamation className="text-md mt-1" /> {errors.rule}</div>}
                        </div>

                        <div className="w-8/12 pt-2">
                            <div className="flex items-center">
                                <input
                                    ref={activeRef}
                                    type="checkbox"
                                    className="form-checkbox text-gray-500 mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    id="active"
                                />
                                <label htmlFor=""><span className="text-gray-500 pl-2">Tornar usuário disponível no sistema</span></label>
                            </div>
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

export default Create;
