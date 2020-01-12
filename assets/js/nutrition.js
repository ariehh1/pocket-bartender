const nutritionAppID = 'd308f986';
const nutritionAPIKey = '2d7ae686c06de5bd7f5b9300309bd166';
const userID = 0;
const nutritionEndpoint =
  'https://trackapi.nutritionix.com/v2/natural/nutrients';
const searchEndpoint = 'https://trackapi.nutritionix.com/v2/search/instant';
const search = '?query=';
const searchParameters =
  '&self=false&branded=false&common=true&common_general=true&common_grocery=true&common_restaurant=true&locale=en_US&detailed=false&claims=false';
const apiHeaders = {
  'content-type': 'application/json',
  accept: 'application/json',
  'x-app-id': nutritionAppID,
  'x-app-key': nutritionAPIKey,
  'x-remote-user-id': userID
};

var calsArray;
var total;

// init();

// function init() {
//   nutritionTest();
// }

function nutritionTest(keyword) {
  calsArray = [];
  
  axios({
    method: 'get',
    url: searchEndpoint + search + keyword + searchParameters,
    headers: apiHeaders
  })
    .then(function(searchResponse) {
      // console.log(searchResponse);
      console.log('name: ' + searchResponse.data.common[0].food_name);

      var nutritionQuery = searchResponse.data.common[0].food_name;
      var getNutritionOf = { query: nutritionQuery };

      axios({
        method: 'post',
        url: nutritionEndpoint,
        data: getNutritionOf,
        headers: apiHeaders
      }).then(function(nutritionResponse) {
        // console.log(nutritionResponse);
        var ingredientCals = nutritionResponse.data.foods[0].nf_calories;
        calsArray.push(ingredientCals);
        console.log('calories: ' + ingredientCals);
      });
    })
    .catch(err => console.log(err));
}

// calculates the calories in the drink
function totalCals(arr) {
  total = arr.reduce(function(a,b) {
    return a + b;
  });
  console.log(total);
  return total;
}