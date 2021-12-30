export default function authHeader() {

    const user = JSON.parse(localStorage.getItem('user'));
  
    if (user ) {
        // console.log(user);
      return { Authorization: 'Bearer ' + user }; 
    } ;
  }