import {shallowMount} from '@vue/test-utils';
import Vue from 'vue';
import Vuex from 'vuex';
import ContentListQueue from '@/views/partials/ContentListQueue';
import Vuetify from 'vuetify';
import * as snoowrap from 'snoowrap';
jest.mock('snoowrap');

let localVue = Vue.use(Vuex);
localVue.use(Vuetify);

describe('ContentListQueue.vue', function () {
  let wrapper;
  let actions;
  let store;
  let state;
  let getters;
  let propsData;

  beforeEach(function () {
    propsData = {
      listing: [
        new snoowrap.objects.Submission,
        new snoowrap.objects.Comment
      ]
    };

    actions = {};
    state = {};
    getters = {};
    store = new Vuex.Store({
      state,
      actions,
      getters
    });
    wrapper = shallowMount(ContentListQueue, {propsData, store, localVue});
  });

  describe('UI', function () {
    it('should have a fluid v-container as root element', function () {
      expect(wrapper.is('v-container-stub')).toBeTruthy();
      expect(wrapper.attributes().fluid).toBe('');
    });

    it('should have v-layout child under v-container', function () {
      expect(wrapper.find('v-container-stub > v-layout-stub').exists()).toBeTruthy();
    });

    it('has row and wrap props on v-layout', function () {
      let layout = wrapper.find('v-container-stub > v-layout-stub');
      expect(layout.attributes().row).toBe('');
      expect(layout.attributes().wrap).toBe('');
    });

    it('should have v-flex for ever listing under v-layout', function () {
      let layout = wrapper.findAll('v-layout-stub > v-flex-stub');
      expect(layout.length).toBe(propsData.listing.length);
      propsData.listing = [];
      wrapper.setProps(propsData);
      layout = wrapper.findAll('v-layout-stub > v-flex-stub');
      expect(layout.length).toBe(propsData.listing.length);
    });

    it('has xs12 and my3 on v-flex', function () {
      let flex = wrapper.find('v-flex-stub');
      expect(flex.attributes().xs12).toBe('');
      expect(flex.attributes().my3).toBe('');
    });

    it('has v-container under v-flex with pa-0, pb-2 and ma-0 attributes', function () {
      let container = wrapper.find('v-flex-stub > v-container-stub');
      expect(container.attributes('pa-0')).toBe('');
      expect(container.attributes('pb-2')).toBe('');
      expect(container.attributes('ma-0')).toBe('');
    });

    it('displays a list of Submissions and Comments in the same order as props.listings', function () {
      let flexes = wrapper.findAll('v-flex-stub');
      expect(flexes).toHaveLength(propsData.listing.length);
      for (let [i, item] of propsData.listing.entries()) {
        if (item instanceof snoowrap.objects.Submission) {
          expect(flexes.at(i).find('ms-submission-stub').exists()).toBeTruthy();
        }
        else {
          expect(flexes.at(i).find('ms-comment-stub').exists()).toBeTruthy();
        }
      }
    });
  });
});