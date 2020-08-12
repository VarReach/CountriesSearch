<?php
  // =================
  // Prevent direct access
  require_once $_SERVER["DOCUMENT_ROOT"] . "\api\access-limiter.php";
  // =================

  require_once "./controllers/BaseController.php";

  class CountriesController extends BaseController {
    public $allowedMethods = array("GET");

    function __construct() {
      $this->uri = "https://restcountries.eu/rest/v2/";
    }

    // ==================
    //  PRIVATE METHODS
    // ==================

    private function getDetails($filters) {
      $unsetVarError;
      if (!isset($filters["type"])) {
        $unsetVarError = "Must set request filter Type in query";
      }
      if (!isset($filters["value"])) {
        $unsetVarError = "Must set request filter Value in query";
      }
      if (isset($unsetVarError)) {
        http_response_code(400);
        echo json_encode(["status" => 400, "message" => $unsetVarError]);
        exit;
      }

      $type = $filters["type"];
      $value = $filters["value"];

      if (in_array($type, ["name", "fullName", "code"])) {
        // RestCountries expects fullName filters to be under the "name" path with "fullText=true" in the queryString
        if ($type === "fullName") {
          $type = "name";
          $filters["fullText"] = "true";
        // RestCountries expects code filters to be under the "alpha" path
        } else if ($type === "code") {
          $type = "alpha";
        }
      } else {
        http_response_code(400);
        echo json_encode(["status" => 400, "message" => "Invalid request filter Type"]);
        exit;
      }
      // Remove now that we have included them in the path
      unset($filters["type"]);
      unset($filters["value"]);

      return array($type, $value, $filters);
    }

    // ==================
    //  CRUD METHODS
    // ==================

    protected function get($filters) {
      list($type, $value, $filters) = $this->getDetails($filters);

      /**
       * Callback to sort by population when searching by name or fullName
       * When searching by code RestCountries only returns an individual country
       */
      function sortCountriesByPopulation($response) {
        $countries = json_decode($response, true);

        $sortedCountries = usort($countries, function($a, $b) {
          return $b["population"] - $a["population"];
        });

        echo json_encode($countries);
      }

      $this->execute("GET", [
        "filters" => $filters,
        "path" => $type . "/" . $value,
        "callback" => $type !== "alpha" ? "sortCountriesByPopulation" : null
      ]);

    }
  }
?>
