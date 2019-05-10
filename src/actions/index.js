
export const addData = data => ({
  type: 'ADD',
  data:data
})

export const deleteData = id => ({
  type: 'DELETE',
  id: id
})

export const editData = (id,data) => ({
  type: 'EDIT',
  id: id,
  data
})

