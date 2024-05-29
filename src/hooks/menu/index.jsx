import {useCallback, useEffect, useState} from "react";
import {API_URL} from "../../constants/index.jsx";
import axios from "axios";

export const useGetMenuItems = (dependencies) => {
    const [menuItems, setMenuItems] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const retrieveMenu = () => {
        setLoading(true);
        setError(null);
        axios.get(`${API_URL}/menu`).then(response => {
            const result = response.data;
            setMenuItems(result.data);
        }). catch (er => {
            setError(er.message);
        })
        setLoading(false);
    }
    useEffect(() => {
        retrieveMenu();
    }, dependencies);
    return { menuItems, loading, error}
}

export const useAddMenuItem = (dependencies) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const addMenuItem = useCallback(async ({ name, description, price }) => {
        setError(null);
        setLoading(true);
        await axios.post(`${API_URL}/menu`,{
            menuItems:[{name, description, price}]
        }).then(res => {
            const response = res.data;
            setData(response?.data);
        })
            .catch(er => setError(er.message));
        setLoading(false);
    }, dependencies)
    return [data, loading, error, addMenuItem]
}

export const useDeleteMenuItem = (deps) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const deleteMenuItem = useCallback(async  (id) => {
        setError(null);
        setLoading(true);
        setData(null)
        await axios.delete(`${API_URL}/menu/${id}`)
            .then(res => {
            const response = res.data;
            setData(response?.data);
        })
            .catch(er => setError(er.message));
        setLoading(false);
    }, deps);
    return [data, loading, error, deleteMenuItem]
}

export const useUpdateMenuItem = (deps) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const updateMenuItem = useCallback(async  (id, { name, description, price}) => {
        setError(null);
        setLoading(true);
        await axios.put(`${API_URL}/menu/${id}`, {
            name, description, price
        })
            .then(res => {
                const response = res.data;
                setData(response?.data);
            })
            .catch(er => setError(er.message));
        setLoading(false);
    }, deps);
    return [data, loading, error, updateMenuItem];
}