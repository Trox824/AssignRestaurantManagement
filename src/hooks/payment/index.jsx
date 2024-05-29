import { useState } from "react";
import axios from "axios";
import {API_URL} from "../../constants/index.jsx";

export const useProcessPayment = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading ] = useState(false);
    const [error, setError] = useState(null);
    const processPayment = ({orderId, returnedAmount, receivedAmount, paymentMethod}) => {
        setData(null);
        setLoading(true);
        JSON.stringify()
        axios.post(`${API_URL}/payment?orderId=${orderId}`,{
            receivedAmount, paymentType: paymentMethod
        }).then(res => setData(res.data?.data))
            .catch(er => setError(er.message));
        setLoading(false);
    }

    return [data, loading, error, processPayment];
}