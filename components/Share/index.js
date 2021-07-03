import React from 'react';

import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import {
    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    TelegramShareButton,
    WhatsappShareButton,
    LineShareButton,
    FacebookIcon,
    LinkedinIcon,
    TwitterIcon,
    TelegramIcon,
    WhatsappIcon,
    LineIcon,
} from 'react-share';

import classes from './Share.module.scss';

const Share = (props) => {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const { title, url, children } = props;
    return (
        <>
            <Box clone onClick={handleOpen}>
                {children}
            </Box>
            <Modal className={classes.modal} open={open} onClose={handleClose}>
                <div className={classes.paper}>
                    <div className={classes.title}>Share with</div>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                            <FacebookShareButton url={url} quote={title} className={classes.icon}>
                                <FacebookIcon size={32} round />
                                <span>Facebook</span>
                            </FacebookShareButton>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <LinkedinShareButton url={url} quote={title} className={classes.icon}>
                                <LinkedinIcon size={32} round />
                                <span>LinkedIn</span>
                            </LinkedinShareButton>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <TwitterShareButton url={url} quote={title} className={classes.icon}>
                                <TwitterIcon size={32} round />
                                <span>Twitter</span>
                            </TwitterShareButton>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <WhatsappShareButton url={url} quote={title} className={classes.icon}>
                                <WhatsappIcon size={32} round />
                                <span>Whatsapp</span>
                            </WhatsappShareButton>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <TelegramShareButton url={url} quote={title} className={classes.icon}>
                                <TelegramIcon size={32} round />
                                <span>Telegram</span>
                            </TelegramShareButton>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <LineShareButton url={url} quote={title} className={classes.icon}>
                                <LineIcon size={32} round />
                                <span>Line</span>
                            </LineShareButton>
                        </Grid>
                    </Grid>
                </div>
            </Modal>
        </>
    );
};

export default Share;
