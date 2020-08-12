<?php
  // =================
  // Prevent direct access
  require_once $_SERVER["DOCUMENT_ROOT"] . "\api\access-limiter.php";
  // =================
  use GuzzleHttp\Client;

  class BaseController {
    // ==================
    //   PUBLIC METHODS
    // ==================

    public function handleRequest($method) {
      $filters = array();
      if (isset($_SERVER["QUERY_STRING"])) {
        $filters = $this->convertQueryToFilters($_SERVER["QUERY_STRING"]);
      }

      $this->{$method}($filters);
    }

    // ==================
    //  PRIVATE METHODS
    // ==================

    /**
     * Returns an easy-to-manipulate array of filter params
     * @return {Array}
     */
    private function convertQueryToFilters($queryString) {
      parse_str($queryString, $filters);
      return $filters;
    }

    // /**
    //  * Converts the filters associative array back into a queryString
    //  * @param {Array} filters
    //  * @return {string} 
    //  */
    // private function convertFiltersToQuery($filters) {
    //   $queryString = "";
    //   $filterKeys = array_keys($filters);
    //   foreach ($filterKeys as &$key) {
    //     $queryString .= ($key . $filters[$key]);
    //   }

    //   return $queryString;
    // }

    // ==================
    //  PROTECTED METHODS
    // ==================

    /**
     * Executes the request
     * "$uri" should be set by the child Controller's __construct method
     * 
     * @param {string}   method             - The type of request to perform
     * @param {string}   [options.path]     - Optional additional path details
     * @param {array}    [options.filters]  - Optional query filters to apply to the request
     * @param {function} [options.callback] - Optional callback to perform after performing the request
     */
    protected function execute($method, $options = array()) {
      // Init GuzzleHTTP Client
      $client = new Client(["base_uri" => $this->uri]);

      // Grab options
      $path = isset($options["path"]) ? $options["path"] : "";
      $filters = isset($options["filters"]) ? $options["filters"] : array();
      $callback = isset($options["callback"]) ? $options["callback"] : null;

      // Don't throw exceptions on HTTP protocol errors, instead return the error
      $filters['http_errors'] = false;

      $response = $client->request($method, $path, $filters);
      $statusCode = $response->getStatusCode();
      if ($statusCode !== 200) {
        http_response_code($statusCode);
        echo json_encode(["status" => $statusCode, "message" => $response->getReasonPhrase()]);
        exit;
      }
      $response = $response->getBody();

      if (isset($callback)) {
        $callback($response);
      } else {
        echo $response;
      }
    }

    // ==================
    //  CRUD METHODS
    // ==================

    protected function get($filters) {
      $this->execute("GET", ["filters" => $filters]);
    }
  }
?>
