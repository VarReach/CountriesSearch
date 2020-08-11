<?php
  // =================
  // '_ACCESSVAR' is set in index.php. If someone directly navigates to a file that requires this one
  // '_ACCESSVAR' will not be defined and a 404 will be returned
  //
  if (!defined('_ACCESSVAR')) {
    http_response_code(404);
    exit;
  }
  // =================
?>