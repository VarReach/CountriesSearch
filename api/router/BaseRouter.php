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

    function __construct() {
      header('Content-type: application/json');
      header("Access-Control-Allow-Origin: *");

      $this->uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
      $this->method = $_SERVER['REQUEST_METHOD'];
    }

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
