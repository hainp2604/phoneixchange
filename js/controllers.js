'use strict';

/* Controllers */


function currencyCrtl($scope,openExchangeRates) {

  $scope.balances = new Array;
  $scope.rates = new Object;
  $scope.exchangeRates  = openExchangeRates.getRates();
  $scope.currencyLegend = openExchangeRates.getLegend();

  $scope.addBalance = function() {
    var newEmptyBalance = {exchangeRate:'', amount:''};
    $scope.balances.push(newEmptyBalance);
  }

  $scope.removeBalance = function(index) {
    $scope.balances.splice(index,1);
  }

  $scope.getCurrencyName = function(symbol) {
    if ($scope.currencyLegend) {
      return $scope.currencyLegend[symbol];
    } else {
      return false;
    }
  }

  $scope.getCurrencyNameFull= function(symbol) {
    if ($scope.currencyLegend) {
      return $scope.currencyLegend[symbol]+' ('+symbol+')';
    } else {
      return false;
    }
  }

  $scope.totalBalance = function() {

    var total = 0;

    for (var m = 0; m < $scope.balances.length; m++) {
      var value = $scope.convertToNumber($scope.balances[m].amount);
      var exchangeRate = $scope.balances[m].exchangeRate;
      if (value != 0 && exchangeRate != '') {
        total = total + $scope.convertCurrencyValueToBaseValue(value,exchangeRate);
      }
    }
    
    return total;
  }

  $scope.convertToNumber = function(value) {
    
    var floatNumber = parseFloat(value);
    return floatNumber ? floatNumber : 0;

  }

  $scope.roundDown = function(number) {

    return Math.round(number*100) / 100;

  }

  $scope.convertCurrencyValueToBaseValue = function(currencyValue,exchangeRate) {
 
    var baseValue = currencyValue / exchangeRate;
    return baseValue;
 
  }

  $scope.convertBaseValueToCurrencyValue = function(baseValue,exchangeRate) {

    var currencyValue = (baseValue || exchangeRate) ? baseValue * exchangeRate : 0;
    return currencyValue;

  }

  $scope.ageOfExchangeRate = function() {

    if ($scope.exchangeRates) {

      var currentTimeStamp = new Date().getTime();

      // multiplied by 1000 so that the argument is in milliseconds, not seconds
      var ageOfExchangeRate =  currentTimeStamp - $scope.exchangeRates.timestamp*1000;

      var minutes = Math.round(ageOfExchangeRate / 1000 / 60);

      var formattedTime = minutes + ' minutes';

    return formattedTime;

    } else {

      return false;

    }
    
  }

  // populate form on load with one empty fields
  $scope.addBalance();

}