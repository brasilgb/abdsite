import { usePage, Head } from '@inertiajs/inertia-react';
import React, { Fragment, useState } from 'react';
import { FiFacebook } from "react-icons/fi";
import { HiOutlineArrowCircleUp } from 'react-icons/hi';
import FooterSite from '../footer';
import NavBarSite from '../navbar';
const Layout = ({ children }) => {

    const { general } = usePage().props;

    const logo = general.logo ? general.logo : 'default.jpg';

    const [showScroll, setShowScroll] = useState(false)

    const checkScrollTop = () => {
        if (!showScroll && window.pageYOffset > 400) {
            setShowScroll(true)
        } else if (showScroll && window.pageYOffset <= 400) {
            setShowScroll(false)
        }
    };

    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('scroll', checkScrollTop)

    return (
        <Fragment>
            <Head>
                <link rel="icon" type="image/svg+xml" href={"/storage/images/" + logo} />
            </Head>
            <div className="fadeIn flex flex-col min-h-screen">
                <div className="w-full bg-black pb-16 z-50">
                    <NavBarSite />
                </div>
                <div className="flex bg-gray-100 py-10 px-40">
                    <div className="auto">
                        <h1 className="text-5xl text-yellow-900 text-shadow font-Sail">{general.title}</h1>
                    </div>
                    <div className="flex-1 pt-2 pl-10">
                        <p className="text-4xl text-gray-700 text-shadow text-left font-Rouge">{general.description}</p>
                    </div>
                    <div className="auto text-right">
                        <a
                            href="https://www.facebook.com/arsartesacra/"
                            className="text-5xl text-yellow-900 hover:text-yellow-800 text-shadow"
                        >
                            <FiFacebook />
                        </a>
                    </div>
                </div>
                <div className="bg-gray-200 flex-grow">
                    {children}
                </div>

                <div className="w-full">
                    <FooterSite />
                </div>
                <HiOutlineArrowCircleUp className="scrollTop text-yellow-400" onClick={scrollTop} style={{ height: 40, display: showScroll ? 'flex' : 'none' }} />
            </div>
        </Fragment>
    )
};

Layout.displayName = "Layout Site";
export default Layout;
