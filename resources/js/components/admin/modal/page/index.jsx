import React, { Fragment } from 'react'
import { Inertia } from '@inertiajs/inertia';
import { HiTrash, HiX } from 'react-icons/hi';

const ModalPage = ({ id = 'modal', onClose = () => { }, onIdPage, children }) => {

    const handleOutsideClick = (e) => {
        if (e.target.id === id) onClose();
    }

    const onDelete = () => {
        Inertia.delete(route('pagina.destroy', onIdPage), {_method: 'delete'});
        onClose();
    }
    return (
        <Fragment>
            <div id={id} onClick={handleOutsideClick} className="min-w-screen h-screen animated fadeIn faster fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover">
                <div className="absolute bg-black opacity-30 inset-0 z-0"></div>
                <div className="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white ">
                    {/* <!--content--> */}
                    <div className="text-xl">
                        {children}
                    </div>
                    {/* <!--footer--> */}
                    <div className="p-3 mt-2 text-center space-x-4 md:block">
                        <button onClick={onClose} className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium border-2 text-gray-600 rounded-lg hover:shadow-lg hover:bg-gray-100">
                        <span className="flex align-center"><HiX className="text-xl" /> Cancel</span>
                        </button>
                        <button onClick={onDelete} className="mb-2 md:mb-0 bg-red-500 border-2 border-red-500 px-5 py-2 text-sm shadow-sm font-medium text-white rounded-lg hover:shadow-lg hover:bg-red-600">
                            <span className="flex align-center"><HiTrash className="text-xl" />Delete</span>
                        </button>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default ModalPage;

