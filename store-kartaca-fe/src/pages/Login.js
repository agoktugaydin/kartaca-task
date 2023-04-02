import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import TextInput from "../components/TextInput";
import { Form, Button } from "reactstrap";
import { LOGIN_URL } from "../constants";

const Login = () => {
    const [textInputValue, setTextInputValue] = useState({ email: "", password: "" });
    const { email, password } = textInputValue;

    const navigate = useNavigate();

    // if there is token in session, redirect to home
    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (token) {
            navigate("/home");
        }
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTextInputValue((prev) => ({
            ...prev,
            [name]: value,
        }));
        console.log(textInputValue);
    };

    const handleLoginButton = (e) => {
        e.preventDefault();

        const formData = { email, password };

        fetch(LOGIN_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error("Login failed");
                }
            })
            .then((data) => {
                console.log("Success:", data);
                sessionStorage.setItem("token", data.token); // store provided token in session
                navigate("/home");
            })
            .catch((error) => {
                alert(error)
                console.error("Error:", error);
            });
    };


    return (
        <Form className="login-form">
            <div className="input-group">
                <TextInput
                    type="email"
                    value={email}
                    placeholder="Email"
                    label="Email"
                    name="email"
                    onChange={handleChange}
                />
            </div>

            <div className="input-group">
                <TextInput
                    type="password"
                    value={password}
                    placeholder="Password"
                    label="Password"
                    name="password"
                    onChange={handleChange}
                />
            </div>

            <Button className="login-btn" color="primary" onClick={handleLoginButton}>
                Login
            </Button>{" "}
        </Form>
    );
};

export default Login;