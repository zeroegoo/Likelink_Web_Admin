<template>
  <div class="login-container">
    <div class="half-circle-container left">
      <div class="half-circle one"></div>
      <div class="half-circle two"></div>
    </div>

    <div class="half-circle-container right">
      <div class="half-circle three"></div>
      <div class="half-circle four"></div>
    </div>

    <div class="flex items-center justify-center min-h-screen bg-gray-100">
  <div class="text-center z-10">
    <h3 class="text-cyan-500 text-[360px] font-semibold text-center sm:text-[140px] xs:text-[100px]">
      LIFELINK
    </h3>
    <form @submit.prevent="handleLogin" class="max-w-md mx-auto p-6 ">
      <div class="mb-4 relative">
        <input
          type="text"
          v-model="userId"
          id="userId"
          class="mt-1 block w-full rounded-full px-4 py-2 pl-10 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          required
          placeholder="Username"
        />
        <img
          src="../assets/icons/loginprofine.png"
          alt="loginprofine Icon"
          class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5"
        />
      </div>
      <div class="mb-4 relative">
        <input
          type="password"
          v-model="password"
          id="password"
          class="mt-1 block w-full  rounded-full px-4 py-2 pl-10 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          required
          placeholder="Password"
        />
        <img
          src="../assets/icons/password.png"
          alt="password Icon"
          class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5"
        />
      </div>
      <button
        type="submit"
        class="w-48 max-w-md p-3 rounded-full bg-cyan-500 text-white hover:bg-cyan-600 transition duration-200"
      >
        Login
      </button>
    </form>
    <p v-if="loginError" class="text-red-500 text-center mt-4">{{ loginError }}</p>
  </div>
</div>
  </div>
</template>

<script>
import fetchAPI from '../../service/fetchAPI.ts';
export default {
  name: "Login",
    components: {
  },
  setup() {
    return {
      userId: '',
      password: '',
      loginError: '',
    };
  },
  methods: {
    async handleLogin() {
      if (this.userId === '1234' && this.password === '1234') {
        // try {
        //   const payload = {
        //       "user_type_id": "3",
        //       "username": this.userId,
        //       "password": this.password
        //     }
        // const result = await fetchAPI.post('http://rifile.trueddns.com:48195/api/User/Login', payload);
        // if(result) {
        //   dataDetail.value = result
          this.$router.push('/EmergencyAlert');
        // }
        // console.log(result)
        // } catch (error) {
        //   console.error('Error fetching data:', error);
        // }
      } else {
        this.loginError = 'Invalid User ID or Password. Please try again.';
      }
    },
  },
};
</script>

<style scoped>

.login-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: #f2f2f2;
}


.half-circle-container.left {
    position: absolute;
    left: -0%;
    bottom: 0%;
    width: 50vw;
    height: 60vh;
    z-index: 1;
}

.half-circle-container.right {
  position: absolute;
  bottom: 0;
  right: -25%;
  width: 50vw;
  height: 60vh;
}

.half-circle {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  opacity: 0.7;
}

.half-circle.one {
  background-color: #00BCD4;
  left: 25px;
  left: -50%;
  bottom: -2%;
  width:100%;
  height:100%;
  border-radius: 50%;
  opacity: 0.2
}

.half-circle.three {
  background-color: #00BCD4;
  left: 25px;
  right: -50%;
  bottom: -2%;
  width:100%;
  height:100%;
  border-radius: 50%;
  opacity: 0.2
}

.half-circle.four {
  background-color: #00BCD4;
  left: 25px;
  left: -30%;
  bottom: -40%;
  width:100%;
  height:100%;
  border-radius: 50%;
  opacity: 0.2
}

.half-circle.two {
  background-color: #00BCD4;
  left: 25px;
  left: -30%;
  bottom: -40%;
  width:100%;
  height:100%;
  border-radius: 50%;
  opacity: 0.2
}
</style>
