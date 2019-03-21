import {shallowMount} from '@vue/test-utils'
import Loading from '@/views/partials/Loading';
import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify';

let localVue = Vue.use(Vuex);
localVue.use(Vuetify);

describe('Loading.vue', function () {
  let wrapper;
  let actions;
  let store;
  let state;
  let getters;
  let propsData;
  let $router;
      
  beforeEach(function () {
    jest.useFakeTimers();
    propsData = {};

    actions = {
      logOut: jest.fn()
    };
    state = {
      refreshToken: 'value',
    };
    getters = {};
    store = new Vuex.Store({
      state,
      actions,
      getters
    });

    $router = {
      replace: jest.fn()
    };
    wrapper = shallowMount(Loading, {
      propsData, 
      store, 
      localVue,
      mocks: {
        $router,
      }
    });
  });

  afterEach(function () {
    jest.resetAllMocks();
  });

  describe('UI', () => {
    it('has a CenteredText component with text "Loading ModShark"', function () {
      let centeredText = wrapper.find('centered-text-stub');
      expect(centeredText.exists()).toBeTruthy();
      expect(centeredText.attributes().text).toEqual('Loading ModShark');
    });
    it('should redirect to home if refreshToken changes', function () {
      state.refreshToken = 'new value';
      expect($router.replace).toHaveBeenCalledWith('/');
    });
    it('has a ModShark image in the CenteredText component', function () {
      let centeredText = wrapper.find('centered-text-stub');
      let img = centeredText.find('img');
      expect(img.exists()).toBeTruthy();
      expect(img.attributes().src).toMatch('img/modshark.svg');
    });
  });

  it('should dispatch logOut after 6 seconds if refreshToken doesn\'t change', function () {
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(actions.logOut).not.toBeCalled();
    jest.advanceTimersByTime(6000);
    expect(actions.logOut).toBeCalled();
  });

  it('redirects to index when logOut is called', function () {
    jest.runOnlyPendingTimers();
    expect(actions.logOut).toBeCalled();
    expect($router.replace).toHaveBeenCalledWith('/');
  });

  it('should clear timeout if refreshToken changes to non-empty value', function () {
    state.refreshToken = '';
    expect(clearTimeout).toHaveBeenCalledTimes(0);
    state.refreshToken = 'new value';
    expect(clearTimeout).toHaveBeenCalledWith(wrapper.vm.$data.logOutTimeout);
  });

  it('should redirect user to "redirect" prop value on non-empty refreshToken change', function () {
    wrapper.setProps({redirect: 'new_url'});
    state.refreshToken = '';
    expect($router.replace).toHaveBeenCalledTimes(0);
    state.refreshToken = 'new value';
    expect($router.replace).toHaveBeenCalledWith(wrapper.vm.$props.redirect);
  });

  it('should redirect user to index page on non-empty refreshToken change if "redirect" prop is empty', function () {
    state.refreshToken = '';
    expect($router.replace).toHaveBeenCalledTimes(0);
    state.refreshToken = 'new value';
    expect($router.replace).toHaveBeenCalledWith('/');
  });
});
