import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import CenteredText from "./views/CenteredText";
import Modqueue from "./views/Modqueue";
import SubredditView from "./components/SubredditView";
import RedditFactory from "./models/RedditFactory";
import Loading from "./views/partials/Loading";
import Unmoderated from "./views/Unmoderated";

Vue.use(Router);

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      name: 'any',
      component: CenteredText,
      props: {
        text: "Could not find anything!"
      }
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter: (to, from, next) => {
        let ms = JSON.parse(localStorage.getItem('ms'));
        if (ms['authenticated']) {
          next({name: 'subreddit_modqueue', params: {subreddit: "mod"}});
        }
        next();
      }
    },
    {
      path: '/loading',
      name: 'loading',
      component: Loading,
      props: true,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/settings',
      name: 'settings',
      meta: {
        requiresAuth: true,
      },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/r/:subreddit',
      name: 'subreddit',
      component: SubredditView,
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: 'modqueue',
          name: 'subreddit_modqueue',
          component: Modqueue
        },
        {
          path: 'unmoderated',
          name: 'subreddit_unmoderated',
          component: Unmoderated
        },
        {
          path: 'moderators',
          name: 'subreddit_moderators',
          component: Home
        },
        {
          path: 'submission/:submission_id',
          name: 'subreddit_submission',
          component: Home,
          children: [
            { 
              path: 'comment/:comment_id', 
              name: "subreddit_comment", 
              component: Home
            }
          ]
        },
      ]
    },
    {
      path: '/modmail',
      component: {
        render (c) { return c('router-view') }
      },
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: ':subreddits?',
          name: 'modmail',
          component: Home,
        },
        {
          path: 'conversation/:conversation_id',
          name: 'modmail_conversation',
          component: Home,
        }
      ]
    },
    {
      path: '/u/:username',
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: 'overview',
          name: 'user',
          Component: Home,
        },
        {
          path: 'submitted',
          name: 'user_submitted',
          component: Home,
        },
        {
          path: 'comments',
          name: 'user_comments',
          component: Home,
        },
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  console.log("before", to.matched.some(record => record.meta.requiresAuth));
  if (to.matched.some(record => record.meta.requiresAuth)) {
    let ms = JSON.parse(localStorage.getItem('ms'));
    console.log("before !ms['authenticated']", !ms['authenticated']);
    if (!ms['authenticated']) {
      console.log("before redirecting auth");
      next({
        path: "/",
        replace: true
      });
    }
    // else if here that checks that Reddit singleton is set. If not, redirect to authenticating loading screen component 
    else if (RedditFactory.instance() === null) {
      console.log("before redirecting load auth", to);
      next({
        name: "loading",
        replace: true,
        params: {
          redirect: to.path
        }
      });
    }
  }
  next();
});


export default router;