function isAuthenticated(username, password){
    if(username==='pekka' && password==='testi') {
      console.log("success");  
      return true;   
    }
    else {
      console.log("no success");  
      return false;
    }
    
  }

module.exports = isAuthenticated;