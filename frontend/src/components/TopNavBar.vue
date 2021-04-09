<template>
    <div id="TopNavBar">

        <nav class="navbar">
          <li class="logo">
                <img src="../assets/Logo1.png" class="logo" alt="UoN logo" height="70"/>
          </li>
                <router-link class="link" :to="{ name: 'Live' }">
                    Live Data Plot
                </router-link>
                <router-link class="link" to="/Saved">
                    Saved Data Plot
                </router-link>
            <router-link class="link" to="/login">
              Logout
            </router-link>
        </nav>

    </div>

</template>

<script>

    export default {
        name: "TopNavBar",
      mounted() {
      }
    }
</script>

<style scoped>

    .link {
        display: block;
        color: white;
        text-align: center;
        font-weight: bold;
        padding: 2% 2%;
        font-size: x-large;
        text-decoration: none;
        float: left;
    }
    .link:hover {
        background-color: rgba(19, 17, 123, 1);
    }
    @media (max-width:769px) {
      .link {
        font-size: small;
      }
      .logo{
        height: 35px;
      }
    }
    .logo {
        padding: 0.5% 0.5%;
    }

    .navbar {
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