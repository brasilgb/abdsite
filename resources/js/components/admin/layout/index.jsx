import React, { Fragment, useState } from 'react';
import { HiMenu } from 'react-icons/hi';
import FooterAdmin from '../footer';
import NavBarAdmin from '../navbar';
import SideBarAdmin from '../sidebar';
const Layout = ({ children }) => {
    const [openSidebar, setOpenSidebar] = useState(false);

    return (
        <Fragment>
            <div className="flex">

                <div className="absolute flex pt-4 pl-2 ">
                    <button
                        onClick={() => setOpenSidebar(!openSidebar)}
                        type="button" className="text-gray-100 hover:text-gray-400"
                    >
                        <HiMenu />
                    </button>
                </div>

                <div className={"md:block h-screen sticky top-0" + (openSidebar ? ' block' : ' hidden')}>
                    <SideBarAdmin />
                </div>
                <div className="w-full flex flex-col">
                    <div className="w-full">
                        <NavBarAdmin />
                    </div>
                    <div className="h-full w-full bg-gray-200 flex-grow">
                        <div className="app p-4">
                            {children}
                        </div>
                    </div>
                    <div className="w-full">
                        <FooterAdmin />
                    </div>
                </div>
            </div>
        </Fragment>
    )
};
Layout.displayName = "Layout Admin";
export default Layout;
