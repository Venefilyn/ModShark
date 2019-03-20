<template>
  <v-container
    bg
    fill-height
    grid-list-md
    text-xs-center
  >
    <v-layout
      row
      wrap
      align-center
    >
      <v-flex>
        <slot />
        <div
          v-if="text"
          class="subheading"
        >
          {{ text }}
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'MsNoContent',
  props: {
    text: {
      type: String,
      default: null,
      required: false
    },
  },
}
</script>