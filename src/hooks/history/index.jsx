import {useEffect, useState} from "react";
import axios from "axios";
import {API_URL} from "../../constants/index.jsx";

export const useGetOrder = ({ orderStatus, deps }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const fetchOrder = () => {
        setOrders([]);
        setLoading(true);
        setError(null);
        axios.get(`${API_URL}/order?status=${orderStatus}`)
            .then(res => setOrders(res.data?.data))
            .catch(er => setError(er.message))
        setLoading(false);
    }
    useEffect(() => {
        fetchOrder();
    }, deps);
    return [orders, loading, error]
}