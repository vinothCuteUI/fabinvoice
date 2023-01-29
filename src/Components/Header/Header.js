import classes from './Header.module.css';
import logo from "../../assets/images/fabevy-logo-landscape.png";
import Container from '../Container/Container';
import Flexbox from '../Flexbox/Flexbox';
import flexclasses from '../Flexbox/Flexbox.module.css'


const Header = (props)=>{
    return(
        <section className={classes['header-top']}>
            <Container className={`container-fluid`}>
                <Flexbox className={`${flexclasses['align-items.center']}`}>
                    <div className={`${classes['header-logo']} ${flexclasses["col-xs-6"]}`}>
                        <a className={classes['logo']} href='#'>
                            <img src={logo} alt="" />
                        </a>
                    </div>
                </Flexbox>
            </Container>
        </section>
    )
}

export default Header;