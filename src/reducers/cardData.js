let data = []

const cardData = (state = data, action) => {
  switch (action.type) {
    case 'ADD':
     return [...state,action.data]  
    case 'DELETE':
      return state.filter(data => data.id !== action.id)
    case 'EDIT':
    console.log(action,state);
      const index = state.findIndex(data=>data.id === action.id);
      console.log(index);
      let returnData = state;
      returnData[index] = action.data;
      console.log(returnData);
      return returnData
    
    default:
      return state
  }
}

export default cardData
