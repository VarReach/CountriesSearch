<?php
  // =================
  // Prevent direct access
  require_once $_SERVER['DOCUMENT_ROOT'] . '\api\access-limiter.php';
  // =================

  require "./controllers/BaseController.php";

  class CountriesController extends BaseController {
    public $allowedMethods = array("GET");
  }
?>
