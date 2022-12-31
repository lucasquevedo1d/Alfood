
export const goToRestaurant = (navigate:any) =>{
     navigate("/restaurantes")
}

export const goToAdminPagina = (navigate:any) =>{
    navigate("/admin/restaurantes")
}

export const goToEdit = (navigate:any, id:any) =>{
    navigate(`/admin/restaurantes/${id}`)
}

export const goToNovoRestaurante = (navigate:any) =>{
    navigate("/admin/novoRestaurante")
}