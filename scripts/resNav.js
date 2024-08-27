const showMenu = () => {
    const menu = document.getElementsByClassName("menu");
    
    // Check if the menu is currently not displayed
    const display_status = (menu[0].style.display === "none");
    // console.log(menu[0].style.display, display_status);
  
    if (display_status) {
      // Show the menu if it's hidden
      menu[0].style.display = "block";
    } else {
      // Hide the menu if it's visible
      menu[0].style.display = "none";
    }
  };
  