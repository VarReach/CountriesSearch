<?php
  // =================
  // Prevent direct access to additional files
  define("_ACCESSVAR", 1);
  // =================

  require "vendor/autoload.php";
  require_once "./router/BaseRouter.php";
  // Controllers
  require_once "./controllers/CountriesController.php";

  // ==================
  //       ROUTES
  // ==================

  $app = new BaseRouter();

  $app->use("/countries", new CountriesController());
?>
