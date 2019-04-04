<template>
  <v-container class="about">
    <h1>About ModShark</h1>
    <p>
      ModSharks aim is to make on-the-go Reddit moderation as easy and simple as possible. It makes use of the latest features of the web to make the experience as good as possible without disruptions.   
    </p>
    <h2>Why ModShark</h2>
    <p>
      We felt that the current mobile and on-the-go moderation with Reddit is subpar. If you want moderate at work or from a phone there's a possibility you wouldn't be able to use toolbox.
      Android users has the benefit of ModSoup - An on-the-go native Reddit moderation application with toolbox integration. We do not aim to replace ModSoup, but to make everyone else get the same experience. 
    </p>
    
    <h2>Contributing</h2>
    <p>ModShark is an open-source project that anyone can spin-up and run within minutes! Our source code is available on GitHub, which is also the place where we keep track of issues.</p>
    <v-btn color="info" href="https://github.com/SpyTec/ModShark">GitHub</v-btn>
    
    <h2>Meet the Team</h2>
    <p>Our team consists of software engineers and students.</p>
    <v-layout
      row
      wrap
      align-start
      d-inline-flex
    >
      <v-flex
        v-for="(contributor, i) in contributors"
        :key="i"
        ma-2
        md4
        sm5
      >
        <v-card>
          <v-card-title primary-title>
            <v-layout>
              <v-flex mr-2>
                <v-avatar
                  size="64"
                  color="grey darken-4"
                >
                  <img
                    :src="contributor.avatar"
                    :alt="contributor.name + 's avatar'"
                  >
                </v-avatar>
              </v-flex>
              <v-flex>
                <div>
                  <h3 class="headline mb-0">
                    {{ contributor.name }}
                  </h3>
                  <div class="subheading">
                    {{ contributor.title }}
                  </div>
                </div>
              </v-flex>
            </v-layout>
          </v-card-title>
          <v-card-text v-if="contributor.bio" class="body-1">
            {{ contributor.bio }}
          </v-card-text>
          <v-divider />
          <v-card-actions>
            <v-btn
              v-for="(link, j) in contributor.links"
              :key="j"
              flat
              color="orange"
              :href="link.url"
            >
              {{ link.name }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      contributors: [
        {
          name: 'SpyTec',
          title: 'Software Engineer',
          bio: 'A professional slacker creating software',
          avatar: 'https://avatars1.githubusercontent.com/u/6598829?s=64&v=4',
          links: [
            {
              name: 'GitHub',
              url: 'https://github.com/SpyTec',
            },
          ],
        },
        {
          name: 'Geo☆1088',
          title: 'Anime nerd',
          bio: null,
          avatar: 'https://avatars3.githubusercontent.com/u/4165301?s=64&v=4',
          links: [
            {
              name: 'GitHub',
              url: 'https://github.com/Geo1088',
            },
          ],
        },
        {
          name: 'Garud',
          title: 'Software Engineer',
          bio: null,
          avatar: 'https://avatars1.githubusercontent.com/u/13748882?s=64&v=4',
          links: [
            {
              name: 'GitHub',
              url: 'https://github.com/SayakMukhopadhyay',
            },
            {
              name: 'GitHub',
              url: 'https://github.com/SayakMukhopadhyay',
            },
          ],
        },
      ]
    }
  },
}
</script>