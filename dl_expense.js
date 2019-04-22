"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 13
   Case Problem 2

   Author: Paige Mabbitt
    Date: 4.18.19    
   
   Filename: dl_expenses.js
   
   Function List
   =============
   
   validateSummary()
      Validates the data entry in the summary field.
   
   calcClass(sumClass)
      Sums up all of the data values for elements of the sumClass class.
      
   calcExp()
      Calculates the travel expenses from all categories and dates.
      
   formatNumber(val, decimals)
      Formats the value, "val" to the number of decimals indicated 
      by "decimals", adding thousands separators.
      
   formatUSCurrency(val)
      Formats the value, "val", as U.S. currency.
      
*/
//When the window loads
window.addEventListener("load", function () {
      //all the cells within the travelExp table
      var changingCells = document.querySelectorAll("table#travelExp input.sum");
      //for each cell within the travelExp table
      for (var i = 0; i < changingCells.length; i++) {
            //when the cell changes, run calcExp
            changingCells[i].onchange = calcExp;
      }
      //when the submit button is clicked, run validateSummary
      document.getElementById("submitButton").onclick = function () {
            validateSummary();
      };
});


function validateSummary() {
      //For the element with the id summary 
      var summary = document.getElementById("summary");
      //if no text is present, display the message. If text is present, do nothing
      if (summary.validity.valueMissing) {
            summary.setCustomValidity("You must include a summary of the trip in your report");
      } else {
            summary.setCustomValidity(" ");
      }
}

function calcClass(sumClass) {
      //List of all elements with the same class name
      var sumFields = document.getElementsByClassName(sumClass);
      var sumTotal = 0;
      //For each item in sumFields, parse the number of sumField item value
      for (var i = 0; i < sumFields.length; i++) {
            var itemValue = parseFloat(sumFields[i].value);
            //if item value is a number, add it to sumTotal
            if (!isNaN(itemValue)) {
                  sumTotal += itemValue;
            }

      }
      //return sumTotal after all values have been added
      return sumTotal;

}


function calcExp() {
      //each tr in the tbody in the table with id travelExp 
      var expTable = document.querySelectorAll("table#travelExp tbody tr");
      //for each item in expTable, make the value of the # date the value of # subtotal
      for (var i = 0; i < expTable.length; i++) {
            document.getElementById("subtotal" + i).value = formatNumber(calcClass("date" + i), 2);
      }
      //for the total element of each category, take all the items with that class and put the added values into teh total box
      document.getElementById("transTotal").value = formatNumber(calcClass("trans"), 2);
      document.getElementById("lodgeTotal").value = formatNumber(calcClass("lodge"), 2);
      document.getElementById("mealTotal").value = formatNumber(calcClass("meal"), 2);
      document.getElementById("otherTotal").value = formatNumber(calcClass("other"), 2);
      document.getElementById("expTotal").value = formatUSCurrency(calcClass("sum"));
}






function formatNumber(val, decimals) {
      return val.toLocaleString(undefined, {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
      });
}

function formatUSCurrency(val) {
      return val.toLocaleString('en-US', {
            style: "currency",
            currency: "USD"
      });
}