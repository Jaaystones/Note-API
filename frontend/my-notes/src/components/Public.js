import { Link } from 'react-router-dom'

const Public = () => {
    const content = (
        <section className="public">
            <header>
                <h1>Welcome to <span className="nowrap">Stone Growth Community!</span></h1>
            </header>
            <main className="public__main">
                <p>Located in Lagos Nigeria! <br/> Stone Growth provides a trained staff ready to meet your Ads needs.</p>
                <address className="public__addr">
                    Stone Growth Community<br />
                    3B, Road two, Igbogbo<br />
                    Ikorodu, Lagos-State 104102<br/>
                    <a href="tel:+2347035897528">(703)-589-7528</a>
                </address>
                <br />
                <p>Owner: Jay Stones</p>
            </main>
            <footer>
                <Link to="/login">Employee Login</Link>
            </footer>
        </section>

    )
    return content
}
export default Public