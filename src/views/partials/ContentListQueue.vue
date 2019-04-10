<template>
  <v-container fluid>
    <pull-to-reload :top-load-method="() => {}">
      <v-layout
        row
        wrap
      >
        <v-flex
          v-for="list in listing"
          :key="list.id"
          xs12
          my3
        >
          <v-container
            fluid
            pa-0
            pb-2
            ma-0
          >
            <ms-submission
              v-if="list.constructor._name === 'Submission'"
              :submission="list"
            />
            <ms-comment
              v-else
              :comment="list"
            />
          </v-container>
        </v-flex>
      </v-layout>
    </pull-to-reload>
  </v-container>
</template>

<script>
import MsSubmission from '../../components/Submission';
import MsComment from '../../components/Comment';
import PullToReload from 'vue-pull-to-reload';
    
export default {
  name: 'MsContentListQueue',
  components: {
    MsSubmission,
    MsComment,
    PullToReload,
  },
  props: {
    listing: {
      type: Array,
      required: true
    },
  },
}
</script>

<style scoped>

</style>