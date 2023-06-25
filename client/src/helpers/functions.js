export const getRequest = async (url) => {
    try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });   
        const result = await response.json();
        return result
      } catch (error) {
        console.error('Error:', error);
      }
}

export const postRequest = async (url, payload) => {
    try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });  
        return response
      } catch (error) {
        console.error('Error:', error);
      }
}

export const putRequest = async (url, payload) => {
  try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });  
      return response
    } catch (error) {
      console.error('Error:', error);
    }
}

export const deleteRequest = async (url) => {
  try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      });  
      return response
    } catch (error) {
      console.error('Error:', error);
    }
}