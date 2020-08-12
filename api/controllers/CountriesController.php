<?php
  // =================
  // Prevent direct access
  require_once $_SERVER["DOCUMENT_ROOT"] . "\api\access-limiter.php";
  // =================

  require "./controllers/BaseController.php";

  class CountriesController extends BaseController {
    public $allowedMethods = array("GET");

    function __construct() {
      $this->uri = "https://restcountries.eu/rest/v2/";
    }

    // ==================
    //  PRIVATE METHODS
    // ==================

    private function getPathDetails($filters) {
      $unsetVarError;
      if (!isset($filters["type"])) {
        $unsetVarError = "Must set request filter Value in query";
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
          $filters["fulltext"] = "true";
        // RestCountries expects code filters to be under the "alpha" path
        } else if ($type === "code") {
          $type = "alpha";
        }
      } else {
        http_response_code(404);
        echo json_encode(["status" => 404, "message" => "Not Found"]);
        exit;
      }

      return $type . "/" . $value;
    }

    // ==================
    //  CRUD METHODS
    // ==================

    protected function get($filters) {
      $path = $this->getPathDetails($filters);
      $callback = null;

      $this->execute("GET", [
        "filters" => $filters,
        "path" => $path,
        "callback" => $callback
      ]);
    }
  }
?>
