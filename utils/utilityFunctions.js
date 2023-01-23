// Sanitises a param variable with an underscore to a string with all words capitalize... Example: alfa_romeo -> Alfa Romeo 

const changeStringToUpperCaseFirstCharOnly = (name) => {
   return name.toLowerCase().split("_").map(name=> name.charAt(0).toUpperCase() + name.slice(1)).join(' ')
} 

module.exports = {
    changeStringToUpperCaseFirstCharOnly
}