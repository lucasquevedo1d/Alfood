import { NavigateFunction } from "react-router-dom"

export const goToRestaurant = (navigate: NavigateFunction) =>{
     navigate("/restaurantes") 
}

export const goToAdminPagina = (navigate:NavigateFunction) =>{
    navigate("/admin/restaurantes")
}

export const goToEdit = (navigate:NavigateFunction, id:number) =>{
    navigate(`/admin/restaurantes/${id}`)
}

export const goToNovoRestaurante = (navigate:NavigateFunction) =>{
    navigate("/admin/novoRestaurante")
}