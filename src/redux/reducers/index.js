

const initialState ={
    cart:{
        companies:[]
    }
}


const mainReducer = (state = initialState, action)=>{
    
switch(action.type){
    case "Add_To_Favourite":
        return{
            ...state,
            cart:{
                ...state.cart,
                companies: [...state.cart.companies,action.payload]
            }
        }
        default:
          return  state

}

}
export default mainReducer
