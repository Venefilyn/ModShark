<template>
  <v-container fluid>
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
  </v-container>
</template>

<script>
import MsSubmission from '../../components/Submission';
import MsComment from '../../components/Comment';
    
export default {
  name: 'MsContentListQueue',
  components: {
    MsSubmission,
    MsComment,
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