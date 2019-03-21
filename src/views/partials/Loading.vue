<template>
  <centered-text text="Loading ModShark">
    <v-progress-circular
      indeterminate
      color="primary"
      :size="82"
    />
  </centered-text>
</template>

<script>
import CenteredText from '../../views/CenteredText'
import {mapState} from 'vuex';

export default {
  name: 'MsLoading',
  components: {
    CenteredText,
  },
  props: {
    redirect: {
      type: String,
      required: false,
      default: '/'
    },
  },
  data() {
    return {
      logOutTimeout: null
    }
  },
  computed: {
    ...mapState(['refreshToken'])
  },
  watch: {
    refreshToken(newValue) {
      if (newValue.length > 0) {
        this.redirectUser();
      }
    }
  },
  mounted() {
    this.logOutTimeout = setTimeout(this.logOutUser, 6000); // 6s timeout
  },
  methods: {
    redirectUser() {
      clearTimeout(this.logOutTimeout);
      this.$router.replace(this.redirect)
    },
    logOutUser() {
      this.$store.dispatch('logOut');
      this.$router.replace('/')
    }
  },
}
</script>

<style scoped>

</style>