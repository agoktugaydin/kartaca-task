import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { PRODUCTS_URL, LOGOUT_URL, POST_OFFER_URL, PRODUCTS_URL_WEBSOCKET } from "../constants";
import { Button } from "reactstrap";
import { Table, Input, InputGroup } from 'reactstrap';
import { io } from "socket.io-client";


const Home = () => {

    // Not working
    // const socket = io(PRODUCTS_URL_WEBSOCKET, {transports: ['websocket']});

    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    const handleLogoutButton = () => {

        fetch(LOGOUT_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                token: `${sessionStorage.getItem("token")}`,
            },
        })
            .then((response) => {

                if (response.status !== 200) { // if log out is not successful alert error
                    throw new Error("Internal server error.");
                }
                // clear session and redirect to login page 
                sessionStorage.removeItem("token");
                navigate("/login");
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    // Not working
    // const fetchProductList = () => {
    //     socket.on("connect", () => {
    //         console.log("Connected to WS server");
    //     });

    //     socket.on("disconnect", () => {
    //         console.log("Disconnected from WS server");
    //     });

    //     socket.on("products", (data) => {
    //         setProducts(data.products);
    //     });
    // };

    const fetchProductList = async () => {

        // if not logged in redirect to login page
        if (!sessionStorage.getItem("token")) {
            navigate("/login");
            return;
        }

        fetch(PRODUCTS_URL, {
            headers: {
                token: `${sessionStorage.getItem("token")}`,
            },
        })
            .then((response) => {
                if (response.status === 200) {
                    return response.json()
                } 
                else if(response.status === 401){
                    throw new Error("Unauthorized."); 
                }
            })
            .then((data) => {
                console.log("Success:", data);
                setProducts(data);
            })
            .catch((error) => {
                console.error("Error:", error);
                sessionStorage.removeItem("token");
            });
    };


    useEffect(() => {
        fetchProductList();
    }, []);

    // to track user's offer updates
    const [offerValues, setOfferValues] = useState({});
    const handleOfferChange = (productId, value) => {
        setOfferValues((prev) => ({
            ...prev,
            [productId]: value,
        }));
    };

    const handleOfferPost = (product_id) => {
        const offer_value = offerValues[product_id];

        if (!offer_value) {
            return;
        }
        const formData = { product_id, offer_value };
        fetch(POST_OFFER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                token: `${sessionStorage.getItem("token")}`,
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                fetchProductList();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };


    return (
        <div>
            <h1>Home Page</h1>
            <Button color="danger" onClick={handleLogoutButton}>Logout</Button>
            <div className="product-list">
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Last Offer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(products) && products.length > 0 ? (
                            products.map((product, index) => (
                                <tr key={product.id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{product.name}</td>
                                    <td>{product.last_offer}</td>
                                    <div>
                                        <InputGroup>
                                            <Input
                                                type="number"
                                                placeholder="Enter offer value"
                                                onChange={(e) =>
                                                    handleOfferChange(product.id, e.target.value)
                                                }
                                            />

                                            <Button color="primary" onClick={() => handleOfferPost(product.id)}>
                                                Submit
                                            </Button>

                                        </InputGroup>
                                    </div>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3">No products found.</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default Home;
