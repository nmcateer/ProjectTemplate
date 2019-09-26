
// This is preparation done on the page startup to setup the initial page start
  $().ready(function(){

    hideErrorAlerts();

    $("#personalLink a").click(function(){
      showPersonalDetails(); 
      
      return false;
    });

    $("#carLink a").click(function(){
      showCarDetails(); 
      
      return false;
    });

    $("#quoteLink a").click(function(){
      showQuoteDetails(); 
      
      return false;
    });
  });

  function showCarDetails() {

    hideErrorAlerts();

    var gender = $("#dvPersonalDetails input:radio[name=genderRadio]:checked").val();
      
    if($("#txtName").val() != "" && $("#txtTownCity").val() != "" 
      && $("#txtEmail").val() != "" && $("#txtAge").val() != "" 
      && $("#ddlNCB").val() != "" && (gender == "m" || gender == "f") ) {
        // Hide the personal details section (dvPersonalDetails)
        $("#dvPersonalDetails").hide();
         // Show the car details section (dvCarDetails)
        $("#dvCarDetails").show();
        setActiveNavigation('carLink');
    }
    else {
      $("#dvPersonalDetailsAlert").show();
    }

    
    // Hide the quote section (dvQuoteDetails)
    $("#dvQuoteDetails").hide();
   

  }

  function showPersonalDetails() {

    hideErrorAlerts();
      // Hide the car details section (dvCarDetails)
      $("#dvCarDetails").hide();
      // Hide the quote section (dvQuoteDetails)
      $("#dvQuoteDetails").hide();
      // Show the personal details section (dvPersonalDetails)
      $("#dvPersonalDetails").show();

      setActiveNavigation('personalLink');
  }

  function showQuoteDetails() {

    hideErrorAlerts();

    var gender = $("#dvPersonalDetails input:radio[name=genderRadio]:checked").val();

    if($("#carManuf").val() != "" && $("#txtModel").val() != "" 
    && $("#txtModelAge").val() != "" && $("#txtModelEngine").val() != "" 
    && $("#ddlModelStorage").val() != "" && $("#txtModelEstValue").val() != "" 
    && $("#txtName").val() != "" && $("#txtTownCity").val() != "" 
    && $("#txtEmail").val() != "" && $("#txtAge").val() != "" 
    && $("#ddlNCB").val() != "" && (gender == "m" || gender == "f")) {
      // Hide the car details section (dvCarDetails)
      $("#dvCarDetails").hide();
      // Hide the personal details section (dvPersonalDetails)
      $("#dvPersonalDetails").hide();
      // Show the quote section (dvQuoteDetails)
      $("#dvQuoteDetails").show();
      setActiveNavigation('quoteLink');

      var manuf = $("#carManuf option:selected").text();
      var model = $("#txtModel").val();
      var carAge = $("#txtModelAge").val();
      var engine = $("#txtModelEngine").val();
      var storage = $("#ddlModelStorage option:selected").text();
      var value = $("#txtModelEstValue").val();

      var carJSON = '{ "manuf": "' + manuf 
      + '", "model": "' + model 
      + '", "carAge": "' + carAge 
      + '", "engine": "' + engine 
      + '", "storage": "' + storage 
      + '", "value": "' + value + '" }';

      $("#carJSON").text(carJSON);

    }
    else {
      $("#dvCarDetailsAlert").show();
      $("#dvPersonalDetailsAlert").show();
    }

      
  }

  function getQuote() {

    // Perform validation to test that all data has been entered



    if (true)
    {

      // Get the values from the page elements that you need to create your JSON

      var gender = $("#dvPersonalDetails input:radio[name=genderRadio]:checked").val();
      var age = $("#txtAge").val();
      var yearsNoClaims = $("#ddlNCB option:selected").val();
      var costOfCar = $("#txtModelEstValue").val();
      var carStorage = $("#ddlModelStorage option:selected").val();


      $.ajax({
          type: "GET",
          url: "http://lit-wrkexp-01.lit.lmig.com:8080/api/calculateRates", 
          data: {gender:gender, age:age, noClaimsBonus:yearsNoClaims, costOfCar:costOfCar, carStorage:carStorage}
        }).done(function(msg) {
          // Put the return value into Label created on quote details
          $("#txtQuote").text(msg.result);
          // Hide the Car Details section
          $("#dvCarDetails").hide();
          // Display the quote details page
          $("#dvQuoteDetails").show();
          setActiveNavigation('quoteLink');

      });
  }

//http://localhost:53753/api/rating/CalculateRates

  }

//################################# Helper Functions - look at these when validating and changing section #########################################

  // Use this function to "Reset" the form and hide all 3 error sections whenever you make a section transition
  function hideErrorAlerts()
  {
    $("#dvPersonalDetailsAlert").hide();
    $("#dvCarDetailsAlert").hide();
    $("#dvQuoteDetailsAlert").hide();
  }

  // This function will control the top navigation and set the active tab when you make a section transition
  // You will need to call it and pass in the tab that needs to be made active
  function setActiveNavigation(activeTab) {
    $(".nav li").removeClass("active");

    $("#" + activeTab).addClass("active");
  }

  function isFieldAlphaNumeric(value) {
    return compareValueAgainstRegex(/^[a-z0-9]+$/i, value);
  }

  function isFieldNumeric(value) {
    return compareValueAgainstRegex(/^[0-9]+$/i, value);
  }

