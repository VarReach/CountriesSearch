<?php
  // =================
  // Prevent direct access to additional files
  define("_ACCESSVAR", 1);
  // =================

  require "../vendor/autoload.php";
  require "./router/BaseRouter.php";
  // Controllers
  require "./controllers/CountriesController.php";

  // ==================
  //       ROUTES
  // ==================

  $app = new BaseRouter();

  $app->use("/countries", new CountriesController());
?>
