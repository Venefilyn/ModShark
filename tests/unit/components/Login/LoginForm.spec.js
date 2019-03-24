import {mount, shallowMount} from '@vue/test-utils'
import LoginForm from '@/components/Login/LoginForm';
import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify';
import * as snoowrap from 'snoowrap';
jest.mock('snoowrap');

let localVue = Vue.use(Vuex);
localVue.use(Vuetify);

describe('LoginForm.vue', function () {
  let wrapper;
  let actions;
  let store;
  let state;
  let getters;
  let $router;
  let eventMap;
  let openDialogMock;
  let openDialogReturnMock;
  const snoowrapURL = 'http://example.com';

  beforeEach(function () {
    snoowrap.getAuthUrl.mockReturnValue(snoowrapURL);

    openDialogMock = jest.fn();
    openDialogReturnMock = jest.fn();
    openDialogMock.mockReturnValue(openDialogReturnMock);

    window.open = openDialogMock;
    jest.useFakeTimers();

    eventMap = {};
    window.addEventListener = jest.fn((event, cb) => {
      eventMap[event] = cb;
    });
    
    actions = {
      changeStoreLocally: jest.fn(),
    };
    state = {
      storeLocally: jest.fn(),
      state: 'example_string'
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
    wrapper = shallowMount(LoginForm, {
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

  describe('UI', function () {
    it('has v-container as root element', function () {
      expect(wrapper.is('v-container-stub')).toBeTruthy();
    });

    it('has a ms-login-server-dialog component with value prop defaulting to "false"', function () {
      const dialog = wrapper.find('ms-login-server-dialog-stub');
      expect(dialog.exists()).toBeTruthy();
      expect(dialog.attributes().value).toBeFalsy();
    });

    describe('snackbar', function () {
      let snackbar;
      
      beforeAll(function () {
        snackbar = wrapper.find('v-snackbar-stub');
      });

      it('should default value prop to "false"', function () {
        expect(snackbar.attributes().value).toBeFalsy();
      });

      it('should never close by itself', function () {
        expect(snackbar.attributes().timeout).toBe('0');
      });

      it('should display from top', function () {
        expect(snackbar.attributes().top).toBeTruthy();
      });

      it('should have a btn with text "Close"', function () {
        let btn = snackbar.find('v-btn-stub');
        expect(btn.exists()).toBeTruthy();
        expect(btn.text()).toBe('Close');
      });
    });

    describe('checkbox', function () {
      let checkbox;

      beforeAll(function () {
        checkbox = wrapper.find('v-checkbox-stub');
      });

      it('should have a label "Use locally"', function () {
        expect(checkbox.attributes().label).toBe('Use locally');
      });

      it('is centered', function () {
        expect(checkbox.classes()).toContain('justify-center')
      });
    });

    describe('login button', function () {
      let button;
      
      beforeAll(function () {
        button = wrapper.find({ ref: 'loginButton' });
      });

      it('should have text "Login with Reddit"', function () {
        expect(button.text()).toBe('Login with Reddit');
      });
    });
  });

  function mountWrapper() {
    wrapper = mount(LoginForm, {
      store,
      localVue,
      stubs: {
        'ms-login-server-dialog': '<div />'
      },
      mocks: {
        $router,
      }
    });
  }

  it('should open an popup when clicking login', function () {
    // Need to properly mount to get click working
    mountWrapper();
    
    let button = wrapper.find({ ref: 'loginButton' });
    button.trigger('click');

    expect(openDialogMock).toHaveBeenCalledWith(snoowrapURL, 'mywindow', expect.anything());
  });

  it('should emit authenticating as true when clicking login', function () {
    // Need to properly mount to get click working
    mountWrapper();
    
    let button = wrapper.find({ ref: 'loginButton' });
    button.trigger('click');
    
    expect(wrapper.emitted().authenticating).toBeTruthy();
    expect(wrapper.emitted().authenticating[0]).toBeTruthy();
  });

  it('should check popup every 500ms and emit authenticating as false when it is closed', function () {
    // Need to properly mount to get click working
    mountWrapper();
    
    let button = wrapper.find({ ref: 'loginButton' });
    openDialogReturnMock.closed = false;
    button.trigger('click');
    
    expect(wrapper.emitted().authenticating).toBeTruthy();
    jest.advanceTimersByTime(500);
    expect(wrapper.emitted().authenticating).toHaveLength(1);
    
    openDialogReturnMock.closed = true;
    jest.advanceTimersByTime(500);
    expect(wrapper.emitted().authenticating).toHaveLength(2);
    expect(wrapper.emitted().authenticating[1]).toEqual([false]);
  });

  it('should not check popup if it doesn\'t exist when logging in', function () {
    // Need to properly mount to get click working
    mountWrapper();

    openDialogMock.mockReturnValue(false);
    openDialogReturnMock.closed = true;

    let button = wrapper.find({ ref: 'loginButton' });
    button.trigger('click');
    jest.advanceTimersByTime(500);
    expect(wrapper.emitted().authenticating).toHaveLength(1);
    jest.advanceTimersByTime(500);
    expect(wrapper.emitted().authenticating).toHaveLength(1);
  });

  it('hides snackbar when clicking login button', function () {
    mountWrapper();
    wrapper.vm.$data.authError = true;
    expect(wrapper.find({ ref: 'errorSnackbar' }).props().value).toBeTruthy();
    
    let button = wrapper.find({ ref: 'loginButton' });
    button.trigger('click');
    
    expect(wrapper.find({ ref: 'errorSnackbar' }).props().value).toBeFalsy();
  });

  describe('messageEvent', function () {
    it('should not do anything if event does not have URLSearchParams', function () {
      const popupMock = jest.fn();
      wrapper.vm.$data.popup = {
        close: popupMock
      };
      eventMap.message({data: {}});
      expect(clearTimeout).not.toHaveBeenCalled();
      expect(popupMock).not.toHaveBeenCalled();
    });

    it('should clear timeout if event\'s data is instanceof URLSearchParams', function () {
      expect(clearTimeout).not.toHaveBeenCalled();
      let data = new URLSearchParams();
      eventMap.message({data});
      expect(clearTimeout).toHaveBeenCalled();
    });

    it('should close the popup', function () {
      const popupMock = jest.fn();
      wrapper.vm.$data.popup = {
        close: popupMock
      };
      let data = new URLSearchParams();
      expect(popupMock).not.toHaveBeenCalled();
      eventMap.message({data});
      expect(popupMock).toHaveBeenCalled();
    });

    it('should emit authenticating false and return if returned state and Vuex state variable does not match', function () {
      let data = new URLSearchParams({
        state: 'bad string'
      });
      
      eventMap.message({data});
      expect(wrapper.emitted().authenticating).toHaveLength(1);
      expect(wrapper.emitted().authenticating[0]).toEqual([false]);
    });
  });
});
