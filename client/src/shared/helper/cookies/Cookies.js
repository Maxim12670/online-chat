export const getCookies = (name) => {
  const cookieValue = decodeURIComponent(document.cookie).split('; ').find(row => row.startsWith(name + '='));
  return cookieValue ? cookieValue.split('=')[1] : null
}