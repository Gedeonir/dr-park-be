const generateToken = () => {
    var text = "";
    var possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 20; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return "finalyearproject" + text + "smartparkingprojectpoweredbyjcg";
  };
  
  module.exports = { generateToken };