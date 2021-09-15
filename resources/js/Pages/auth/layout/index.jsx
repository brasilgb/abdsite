import React, { Fragment } from 'react'

const Layout = ({ children }) => {
    return (
        <Fragment>
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
                { children }
            </div>
        </Fragment>
    )
}

export default Layout
