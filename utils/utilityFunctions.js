const changeStringToUpperCaseFirstCharOnly = (name) => {
   return name.toLowerCase().split("_").map(name=> name.charAt(0).toUpperCase() + name.slice(1)).join(' ')
} 

module.exports = {
    changeStringToUpperCaseFirstCharOnly
}