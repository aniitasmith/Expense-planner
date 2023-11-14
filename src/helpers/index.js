import moment from "moment/moment"

export const generateId = () => {
  const random = Math.random().toString(36).substr(2)
  const fecha = Date.now().toString(36)
  return random + fecha
}

export const formatDate = createdAt => {
  return moment(createdAt).format('LL');
}