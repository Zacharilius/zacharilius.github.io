<template>
  <div id="page-container">
    <h1>Zachary Bensley</h1>
    <h2>Software Engineer</h2>
    <div id="seattle-skyline-image-container">
      <img src="../assets/seattle_skyline.png" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
    background-color: #009688;
}

h1, h2 {
  color: #eee;
  text-align: center;
  font-weight: normal;
}

#page-container {
  height: calc(100vh - 64px);  /* 64px is the height of the header */
  box-sizing: border-box;
  padding-top: 60px;
  background-color: #009688;
}

@media screen and (max-width: 944px) {
  #page-container {
    height: calc(100vh - 48px);  /* 48px is the height of the header */
  }
}

@media screen and (max-width: 600px) {
  #page-container {
    height: calc(100vh - 56px);  /* 56px is the height of the header */
  }
}

/*
 * Handles desktop screens
 */
@media screen and (min-width:1025px) {
  #seattle-skyline-image-container {
    position: fixed;
    bottom: 0px;
    left: 0px;
    right: 0px;
  }
}

/*
 * Handles screens for smaller desktops & large tablets
*/
@media screen and (max-width:1025px) {
  #seattle-skyline-image-container {
    position: fixed;
    bottom: 0px;
    left: -100px;
    right: -100px;
  }
}

/*
 * Handles screens for tablets
*/
@media screen and (max-width:800px) {
  #seattle-skyline-image-container {
    position: fixed;
    bottom: 0px;
    left: -300px;
    right: -300px;
  }
}

/*
 * Handles screens for phones
*/
@media screen and (max-width:500px) {
  #seattle-skyline-image-container {
    position: fixed;
    bottom: 0px;
    left: -400px;
    right: -400px;
  }
}
</style>
