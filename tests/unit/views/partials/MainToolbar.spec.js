import {mount, shallowMount} from '@vue/test-utils';
import Vue from 'vue';
import Vuex from 'vuex';
import MainToolbar from '@/views/partials/MainToolbar';
import Vuetify from 'vuetify';

let localVue = Vue.use(Vuex);
localVue.use(Vuetify);

describe('MainToolbar.vue', function () {
  let wrapper;
  let actions;
  let store;
  let state;
  let getters;
  let propsData;

  beforeEach(function () {
    propsData = {};

    actions = {
      updateSubredditsDrawer: jest.fn(),
      updateSettingsDrawer: jest.fn(),
    };
    state = {
      drawerSubreddits: null,
      drawerSettings: null,
    };
    getters = {
      getSubredditName: jest.fn(),
    };
    getters.getSubredditName.mockReturnValue('name');

    store = new Vuex.Store({
      state,
      actions,
      getters
    });
    wrapper = shallowMount(MainToolbar, {propsData, store, localVue});
  });

  describe('UI', function () {
    it('should have a v-toolbar with prop app as root element', function () {
      expect(wrapper.is('v-toolbar-stub')).toBeTruthy();
      expect(wrapper.attributes().app).toBeTruthy();
    });

    it('should have v-toolbar-side-icon as first element under v-toolbar', function () {
      let first = wrapper.find('v-toolbar-stub > *:first-child');
      expect(first.is('v-toolbar-side-icon-stub')).toBeTruthy();
    });

    it.skip('should only show v-toolbar-side-icon from mdAndDown', function () {
      let icon = wrapper.find('v-toolbar-side-icon-stub');
      window.innerWidth = 1264;
      window.dispatchEvent(new Event('resize'));
      expect(icon.isVisible()).toBeTruthy();

      window.innerWidth = 1265;
      window.dispatchEvent(new Event('resize'));
      expect(icon.isVisible()).toBeFalsy();
    });

    it('should display prefixed subreddit name from getSubredditName getter', function () {
      expect(wrapper.find('v-toolbar-title-stub').text()).toBe('r/name');
    });

    it('should have a settings button', function () {
      let btn = wrapper.find('v-btn-stub > v-icon-stub');
      expect(btn.exists()).toBeTruthy();
      expect(btn.text()).toBe('settings');
    });
  });

  it('dispatches updateSubredditsDrawer when clicking on v-toolbar-side-icon', function () {
    wrapper = mount(MainToolbar, {propsData, store, localVue});
    let btn = wrapper.find('.v-toolbar__side-icon'); 
    btn.trigger('click');
    expect(actions.updateSubredditsDrawer).toHaveBeenCalled();
    expect(actions.updateSubredditsDrawer.mock.calls[0][1]).toEqual(!state.drawerSubreddits);
  });

  it('dispatches updateSettingsDrawer when clicking on settings button', function () {
    wrapper = mount(MainToolbar, {propsData, store, localVue});
    let btn = wrapper.findAll('.v-btn').at(1);
    btn.trigger('click');
    expect(actions.updateSettingsDrawer).toHaveBeenCalled();
    expect(actions.updateSettingsDrawer.mock.calls[0][1]).toEqual(!state.drawerSubreddits);
  });
});