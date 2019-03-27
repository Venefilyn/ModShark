import {mount, shallowMount} from '@vue/test-utils';
import Vue from 'vue';
import Vuex from 'vuex';
import LoginServerDialog from '@/components/Login/LoginServerDialog';
import Vuetify from 'vuetify';

let localVue = Vue.use(Vuex);
localVue.use(Vuetify);

describe('LoginServerDialog.vue', function () {
  let wrapper;
  let actions;
  let store;
  let state;
  let getters;
  let propsData;

  beforeEach(function () {
    propsData = {
      value: true
    };

    actions = {
      switchToLocal: jest.fn()
    };
    state = {};
    getters = {};
    store = new Vuex.Store({
      state,
      actions,
      getters
    });
    wrapper = shallowMount(LoginServerDialog, {propsData, store, localVue});
  });

  describe('UI', function () {
    it('should have a persistent v-dialog as root element', function () {
      expect(wrapper.is('v-dialog-stub')).toBeTruthy();
      expect(wrapper.attributes().persistent).toBeTruthy();
    });

    it('should be visible if value prop is true', function () {
      expect(wrapper.attributes().value).toBeTruthy();
    });

    it('should be invisible if value prop is true', function () {
      propsData.value = false;
      wrapper.setProps(propsData);
      expect(wrapper.attributes().value).toBeFalsy();
    });

    it('should have a title of "Server error!"', function () {
      let title = wrapper.find('v-card-title-stub');
      expect(title.text()).toBe('Server error!');
    });

    it('has a button with words "Continue"', function () {
      const continueBtn = wrapper.find({ref: 'continueBtn'});
      expect(continueBtn.text()).toBe('Continue');
    });

    it('has a button with words "Use locally"', function () {
      const continueBtn = wrapper.find({ref: 'useLocallyBtn'});
      expect(continueBtn.text()).toBe('Use locally');
    });
  });

  it('has the name MsLoginServerDialog', function () {
    expect(wrapper.name()).toBe('MsLoginServerDialog');
  });

  it('should emit "input" false when clicking Continue', function () {
    wrapper = mount(LoginServerDialog, {propsData, store, localVue, stubs: {'v-dialog': true}});
    const continueBtn = wrapper.find({ref: 'continueBtn'});
    continueBtn.trigger('click');
    expect(wrapper.emitted().input).toBeTruthy();
    expect(wrapper.emitted().input[0]).toEqual([false]);
  });

  it('should emit "input" false when clicking Use locally', function () {
    wrapper = mount(LoginServerDialog, {propsData, store, localVue, stubs: {'v-dialog': true}});
    const continueBtn = wrapper.find({ref: 'useLocallyBtn'});
    continueBtn.trigger('click');
    expect(wrapper.emitted().input).toBeTruthy();
    expect(wrapper.emitted().input[0]).toEqual([false]);
  });

  it('should dispatch "switchToLocal" when clicking Use locally', function () {
    wrapper = mount(LoginServerDialog, {propsData, store, localVue, stubs: {'v-dialog': true}});
    const continueBtn = wrapper.find({ref: 'useLocallyBtn'});
    continueBtn.trigger('click');
    expect(actions.switchToLocal).toHaveBeenCalled();
  });
});