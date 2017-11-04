<!DOCTYPE html>
<html>
<head>
   <script src="/js/webcomponents/CustomElements.js"></script>
   <?php 
      $PHP_BASE = "/php/";
      
      include("/php/page.php"); 
      
      $PAGE_TITLE = "Materialsammlung";
      
   ?>
   <meta charset="utf-8" />
   <link rel="shortcut icon" type="image/x-icon" href="/img/DDI_clear_Logo.png">
   <link rel="stylesheet" href="/css/page.css">   
   <link rel="stylesheet" href="/css/x-menu.css">   
   <title><?php echo $PAGE_TITLE; ?></title>
   
</head>
<body>
   <?php include("../../php/header.php"); ?>
   <div class="wrapper">
   <div class="main">
      <div class="x-menu-wrapper">
         <?php menu_entry("/abbozza/arduino/","abbozza! Arduino","img/abbozza_blue_arduino.png"); ?>
         <?php menu_entry("/abbozza/calliope/","abbozza! Calliope","img/abbozza_blue_calliope.png"); ?>
         <?php menu_entry("/arduino/","Arduino","img/ArduinoCommunityLogo_SVG.png"); ?>
         <?php menu_entry("/thymio/","Thymio","img/thymio.jpg"); ?>
      </div>
   </div>
   </div>
   <?php include($PHP_BASE .  "footer.php"); ?>
</body>
</html>