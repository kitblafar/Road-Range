<template>
  <div id="TopNavBar">

    <nav class="navbar">
      <li>
      <img src="../assets/logo.png" alt="UoN logo" height="70"/>
      </li>
      <li>
    <router-link class="link" :to="{ name: 'Live' }">
      Live Data Plot
    </router-link>
      </li>
      <li>
    <router-link class="link" to="/Saved" >
      Saved Data Plot
    </router-link>
      </li>
    </nav>

  </div>

</template>

<script>
export default {
  name: "TopNavBar"
}
</script>

<style scoped>

.link{
  display: block;
  color: white;
  text-align: center;
  font-size: x-large;
  font-weight: bold;
  padding: 20px 30px;
  text-decoration: none;
}

.link:hover{
  background-color: rgba(19, 17, 123, 1);
}
.navbar{
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: rgba(19, 17, 123, 0.5);
}

li {
  float: left;
}



</style>