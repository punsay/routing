import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from "react-router-dom";
import About from "./about";
import FormComponent from "./form";
import "./route.css";

const Home = () => (
    <Router>
        <div>
            <AuthButton />
            <ul class="homeli">
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/contactform">Contacts Form</Link>
                </li>
            </ul>
            <Route path="/about" component={About} />
            <Route path="/login" component={Login} />
            <PrivateRoute path="/contactform" component={Form} />
        </div>
    </Router>
);

const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
        this.isAuthenticated = true;
        setTimeout(cb, 100); // fake async
    },
    signout(cb) {
        this.isAuthenticated = false;
        setTimeout(cb, 100);
    }
};

const AuthButton = withRouter(
    ({ history }) =>
        fakeAuth.isAuthenticated ? (
            <p style={{color:"darkblue"}}>
                Welcome!{" "}
                <button
                    onClick={() => {
                        fakeAuth.signout(() => history.push("/"));
                    }}>
                    Sign out
                </button>
            </p>
        ) : (
            <p>You need to log in to fill up the form</p>
        )
);

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            fakeAuth.isAuthenticated ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/login",
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
);

const Form=()=>{
    return(
        <FormComponent />
    )}

class Login extends React.Component {
    state = {
        redirectToReferrer: false
    };

    login = () => {
        fakeAuth.authenticate(() => {
            this.setState({ redirectToReferrer: true });
        });
    };

    render() {
        const { from } = this.props.location.state || { from: { pathname: "/" } };
        const { redirectToReferrer } = this.state;

        if (redirectToReferrer) {
            return <Redirect to={from} />;
        }

        return (
            <div>
                <h2 style={{color:"green"}}>You need to log in to go to fill up the form.</h2>
                <p style={{color:"green",fontSize:"20px"}}>You must Log in to view the page at {from.pathname}</p>
                <button onClick={this.login}>Log in</button>
            </div>
        );
    }
}

export default Home;