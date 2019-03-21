import {shallowMount} from '@vue/test-utils';
import Vue from 'vue';
import Vuex from 'vuex';
import ContentList from '@/views/partials/ContentList';
import * as snoowrap from 'snoowrap';
jest.mock('snoowrap');

let localVue = Vue.use(Vuex);

describe('ContentList.vue', function () {
  let wrapper;
  let actions;
  let store;
  let state;
  let getters;
  let propsData;

  beforeEach(function () {
    propsData = {};

    actions = {};
    state = {};
    getters = {};
    store = new Vuex.Store({
      state,
      actions,
      getters
    });
    wrapper = shallowMount(ContentList, {propsData, store, localVue});
  });

  it('returns undefined template', function () {
    expect(wrapper.html()).toBeUndefined();
  });

  describe('data', function () {
    it('should set data.listing to empty list by default', function () {
      expect(Array.isArray(wrapper.vm.$data.listing)).toBeTruthy();
      expect(wrapper.vm.$data.listing).toHaveLength(0);
    });

    it('should set data.error to be an empty string', function () {
      // setItems throws exception when not implemented
      wrapper = shallowMount(ContentList, {propsData, store, localVue, methods: {
        updateItems() {}
      }});
      expect(typeof wrapper.vm.$data.error).toBe('string');
      expect(wrapper.vm.$data.error).toHaveLength(0);
    });
  });

  describe('mount', function () {
    it('calls updateItems() on mount', function () {
      let stub = jest.fn();
      wrapper = shallowMount(ContentList, {propsData, store, localVue, methods: {
        updateItems: stub
      }});
      expect(stub).toHaveBeenCalled()
    });
  });

  describe('methods', function () {
    describe('isSubreddit()', function () {
      it('checks if parameter is a snoowrap instance', function () {
        let list = new snoowrap.objects.Subreddit;
        expect(wrapper.vm.isSubreddit(list)).toBeTruthy();
        expect(wrapper.vm.isSubreddit({})).toBeFalsy();
      });
    });

    describe('updateItems()', function () {
      it('should call setItems', function () {
        let stub = jest.fn();
        wrapper = shallowMount(ContentList, {propsData, store, localVue, methods: {
          setItems: stub
        }});
        wrapper.vm.updateItems();
        expect(stub).toHaveBeenCalled()
      });
      it('should set data.error to "Could not get items: error" if setItems throws', function () {
        let stub = jest.fn();
        stub.mockImplementation( () => {
          throw new Error('error message')
        });
        wrapper = shallowMount(ContentList, {propsData, store, localVue, methods: {
          setItems: stub
        }});
        wrapper.vm.updateItems();
        expect(stub).toHaveBeenCalled();
        expect(wrapper.vm.$data.error).toBe('Could not get items: error message')
      });
    });
    describe('setItems()', function () {
      it('should throw Error "Not Implemented"', async () => {
        await expect(wrapper.vm.setItems()).rejects.toThrow(Error('Not Implemented'));
      });
    });
  });
});