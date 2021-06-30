import { useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import classes from './Layout.module.scss';

const Header = dynamic(() => import('components/Header'), { loading: () => <p>Loading</p> });
const Footer = dynamic(() => import('components/Footer'), { loading: () => <p>Loading</p> });
const Chat = dynamic(() => import('components/Chat'));
const LoginForm = dynamic(() => import('components/LoginForm'));
const Layout = (props) => {
    const isOpenLoginFrom = useSelector(({ loginReducer }) => loginReducer.isOpenLoginFrom);

    return (
        <>
            {/* <div className={classes.mainPanel}> */}
            <div className={classes.appBar}>
                <Header />
            </div>
            <div className={classes.content}>{props.children}</div>
            {isOpenLoginFrom && <LoginForm popup={true} />}
            <Chat />
            <Footer />
            {/* </div> */}
        </>
    );
};

export default Layout;
