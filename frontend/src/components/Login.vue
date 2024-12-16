<template>
  <div id="login">
    <h1 class="heading">Login UON Telemetry</h1>
    <img src="../assets/logo.png" class="logo" alt="UoN logo" height="100" />
    <div class="loginsec">
    <input class="input" type="text" name="username" v-model="input.username" placeholder="Username" />
    <input class="input" type="password" name="password" v-model="input.password" placeholder="Password" />
    <button class="button" type="button" v-on:click="login()">Login</button>
    </div>
  </div>
</template>

<script>
import LivePage from "@/components/LivePage";

export default {
  name: 'Login',
  data() {
    return {
      input: {
        username: "",
        password: ""
      }
    }
  },
  mounted() {
  },
  methods: {
    async login() {
      // this.response= await this.retrieveAuthentication();
      // this.$emit("authenticated", false);
      // if(this.input.username != "" && this.input.password != "") {
      //   if(this.response==="true") {
          this.$emit("authenticated", true);
          this.$router.replace({ name: "Live",
            component: LivePage});
      //   } else {
      //     console.log("The username and / or password is incorrect");
      //   }
      // } else {
      //   console.log("A username and password must be present");
      // }
    },

    async retrieveAuthentication(){
      let headers = new Headers();
      headers.append('Authorization', "password");
      headers.append('Password', this.input.password);
      let host = window.location.protocol + "//" + window.location.hostname+":2000";
      const res = await fetch(host, {
        method: 'GET',
        headers: headers
      });
      const response = await res.text();
      console.log('Authenticated')
      return response;
    },
  }
}

</script>

<style scoped>
.logo{
  position: relative;
}
.loginsec{
  padding-top: 5%;
}
.heading{
  color: #13117b;
}

.input{
  border-color: #13117b;
}
.button {
  /*display: block;*/
  color: rgba(19, 17, 123, 1);
  font-weight: bold;
  border-color: #13117b;
}

#login {
  width: 70%;
  background-color: #FFFFFF;
  margin: auto;
  margin-top: 10%;
  padding: 5%;
}
</style>