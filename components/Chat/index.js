import React, { useState } from 'react';
import Iframe from 'react-iframe';
import classNames from 'classnames';

import classes from './Chat.module.scss';

const Chat = () => {
    const [show, setShow] = useState(false);

    const iframeClasses = classNames({
        [classes.chatIframe]: true,
        [classes.hide]: !show,
    });

    return (
        <div>
            <div className={iframeClasses}>
                <Iframe url={process.env.NEXT_PUBLIC_BOT_CHAT_URL} width="100%" height="100%" />
            </div>
            <div
                className={classes.chatIcon}
                onClick={() => {
                    setShow(!show);
                }}
            >
                <img style={{ width: '45px' }} src="/chat.svg" />
            </div>
        </div>
    );
};

export default Chat;
