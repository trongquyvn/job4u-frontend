import dynamic from 'next/dynamic';
import classes from './Layout.module.scss';

const Header = dynamic(() => import('components/Header'), { loading: () => <p>Loading</p> });
const Footer = dynamic(() => import('components/Footer'), { loading: () => <p>Loading</p> });
const Layout = (props) => {
    return (
        <>
            {/* <div className={classes.mainPanel}> */}
            <div className={classes.appBar}>
                <Header />
            </div>
            <div className={classes.content}>{props.children}</div>
            <Footer />
            {/* </div> */}
        </>
    );
};

export default Layout;
