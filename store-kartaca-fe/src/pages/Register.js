import React, { useState, useEffect } from "react";
import TextInput from "../components/TextInput";
import { Form, Button } from "reactstrap";
import { REGISTER_URL } from "../constants";
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const [textInputValue, setTextInputValue] = useState({ name: "", surname: "", email: "", password: "" });
    const { name, surname, email, password } = textInputValue;

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

    const handleRegisterButton = (e) => {

        const formData = { name, surname, email, password };

        fetch(REGISTER_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((response) =>
                response.json().then(data => ({
                    data: data,
                    status: response.status
                })
                )).then((response) => { // if successfully registered, redirect to login page
                    if (response.status === 200) {
                        navigate("/login");
                    }
                    else {
                        throw new Error(response.data.message);
                    }
                })
            .then((data) => {
                console.log("Success:", data);
            })
            .catch((error) => {
                alert(error)
                console.error("Error:", error);
            });
    };

    return (
        <Form className="register-form">
            <div className="input-group">
                <TextInput
                    type="text"
                    value={name}
                    placeholder="Name"
                    label="Name"
                    name="name"
                    onChange={handleChange}
                />
            </div>
            <div className="input-group">
                <TextInput
                    type="text"
                    value={surname}
                    placeholder="Surname"
                    label="Surname"
                    name="surname"
                    onChange={handleChange}
                />
            </div>
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
            <Button className="register-btn" color="primary" onClick={handleRegisterButton}>
                Register
            </Button>{" "}
        </Form>
    );
};

export default Register;