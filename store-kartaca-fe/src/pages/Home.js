import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { PRODUCTS_URL, LOGOUT_URL } from "../constants";
import { Button } from "reactstrap";
import { Table } from 'reactstrap';


const Home = () => {
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
                } else{

                    throw new Error("Get products failed.");
                }
            })
            .then((data) => {
                console.log("Success:", data);
                setProducts(data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };


    useEffect(() => {
        fetchProductList();
    }, []);

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
