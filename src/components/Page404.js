import React from 'react';

function Page404(props) {
    return (
        <div>
            <h1>404: Nothing found here!</h1>
            <div className="text-center footer-text">
                <span className="copy-text medium-text">
                    &copy; {new Date().getFullYear()} Friendlink From Amir Khan
                </span>
            </div>
        </div>
    );
}

export default Page404;
