<?php
  // =================
  // Prevent direct access
  require_once $_SERVER['DOCUMENT_ROOT'] . '\api\access-limiter.php';
  // =================

  class BaseRouter {
    private $uri;
    private $method;
    private $routes = array();
    private $baseAddress = "/api";

    // ==================
    //      LIFECYLCE
    // ==================

    /**
     * Sets up CORS and grabs request information.
     * @constructor
     */
    function __construct() {
      header('Content-type: application/json');

      // CORS Setup
      if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        header("Access-Control-Allow-Methods: *");
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) {
          header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
        }
      }
      header("Access-Control-Allow-Origin: *");

      $this->uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
      $this->method = $_SERVER['REQUEST_METHOD'];
    }

    /**
     * Checks if the route/method should be allowed.
     * Returns information gathered from the Controller.
     * @deconstructor
     */
    function __destruct() {
      $currentRoute = $this->getCurrentRoute();
      if (!$this->checkIfRouteAvailable($currentRoute)) {
        $this->handleInvalidRoute();
      }

      $controller = $this->routes[$currentRoute];

      if (!$this->checkIfAllowedMethod($controller)) {
        $this->handleForbiddenMethod();
      }
    }

    // ==================
    //   PUBLIC METHODS
    // ==================

    /**
     * Defines up a new route
     * @param {string}     $route - The route we are intended to define
     * @param {Controller} $cont  - The controller we want to use for this route
     */
    public function use($route, $cont) {
      if (!isset($cont) or !isset($route)) {
        http_response_code(500);
        echo json_encode(["status" => 500, "message" => "Invalid route configuration"]);
        exit;
      }    

      $this->routes[$route] = $cont;
    }

    // ==================
    //  PRIVATE METHODS
    // ==================

    private function getCurrentRoute() {
      return str_replace($this->baseAddress, "", $this->uri);
    }

    private function checkIfRouteAvailable($currentRoute) {
      $routeNames = array_keys($this->routes);
      return in_array($currentRoute, $routeNames);
    }

    private function checkIfAllowedMethod($controller) {
      return in_array(
        strtoupper($this->method), 
        $controller->allowedMethods
      );
    }

    private function handleForbiddenMethod() {
      http_response_code(405);
      echo json_encode(["status" => 405, "message" => "Forbidden"]);
      exit;
    }

    private function handleInvalidRoute() {
      http_response_code(404);
      echo json_encode(["status" => 404, "message" => "Not Found"]);
      exit;
    }
  }
?>
