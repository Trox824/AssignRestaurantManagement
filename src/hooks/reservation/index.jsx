import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {API_URL} from "../../constants/index.jsx";


export const useAddReservation = (item) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);
    const addReservation = useCallback(async ({ customer :{ name, phone }, numOfPeople, reservationTime }) => {console.log(item)
        setData(null);
        setLoading(true);
        setError(null);
        await axios.post(`${API_URL}/reservation`, {
            customer: { name, phone }, numOfPeople, reservationTime
        })
            .then(res => {
                setData(res.data);
            }).catch(er => setError(er.message));
        setLoading(false);
    }, [item])

    return [data, loading, error, addReservation];
}

export const useGetReservations = (deps) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);
    const getReservation = async () => {
        setData([]);
        setLoading(true);
        setError(null);
        await axios.get(`${API_URL}/reservation`)
            .then(res => {
                const returnedData = res.data
                setData(returnedData.data);
                console.log(data)
            }).catch(er => setError(er.message));
        setLoading(false);
    }
    useEffect(() => {
        getReservation()
    }, deps);
    return [data, loading, error];
}