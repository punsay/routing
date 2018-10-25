import React from "react";
import { BrowserRouter as Router, Route, Link, Prompt } from "react-router-dom";

class FormComponent extends React.Component {
    state = {
        isBlocking: false
    };

    render() {
        const { isBlocking } = this.state;
        return (
            <form
                onSubmit={event => {
                    event.preventDefault();
                    event.target.reset();
                    this.setState({
                        isBlocking: false
                    });
                }}
            >
                <Prompt
                    when={isBlocking}
                    message={location =>
                        `Are you sure you want to go to ${location.pathname}`
                    }
                />

                <p>
                    Blocking?{" "}
                    {isBlocking ? "Yes Blocking!, click a link to check!" : "No Blocking!"}
                </p>

                <p>
                    <input
                        size="30"
                        placeholder="Enter Name"
                        onChange={event => {
                            this.setState({
                                isBlocking: event.target.value.length > 0
                            });
                        }}
                    />
                </p>

                <p>
                    <input
                        size="30" max="10"
                        placeholder="Enter Contact Number"
                        onChange={event => {
                            this.setState({
                                isBlocking: event.target.value.length > 0
                            });
                        }}
                    />
                </p>
                <p>
                    <button>Submit</button>
                </p>
            </form>
        );
    }
}
export default FormComponent;