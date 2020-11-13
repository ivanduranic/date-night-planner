$(document).ready(function(){
    $('.collapsible').collapsible();
    $('.scrollspy').scrollSpy();
    $('.carousel').carousel(
        { padding: 0,
            dist: 0,
      
      indicators: true,
      duration: 100,
    }
    );
    autoplay()   
    function autoplay() {
      $('.carousel').carousel('next');
      setTimeout(autoplay, 4500);
  };
    
        //     {

// // CAROUSEL
//     $('.carousel').carousel(
//     {
//       dist: 0,
//       padding: 0,
//       fullWidth: true,
//       indicators: true,
//       duration: 100,
//     }
//     );
  
  
//   autoplay()   
//   function autoplay() {
//       $('.carousel').carousel('next');
//       setTimeout(autoplay, 4500);
//   };
});
