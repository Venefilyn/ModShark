import sinon from 'sinon'
import {shallowMount} from '@vue/test-utils'
import Loading from '@/views/partials/Loading';
import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from "vuetify";

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
    let clock;
    
    beforeAll(function () {
        clock = sinon.useFakeTimers();
    });

    afterAll(function () {
        clock.restore();
    });
    
    beforeEach(function () {
        propsData = {};

        actions = {};
        state = {
            refreshToken: "",
        };
        getters = {};
        store = new Vuex.Store({
            state,
            actions,
            getters
        });

        $router = {
            replace: sinon.spy()
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
    
    describe('UI', () => {
        it('has a CenteredText component with text "Loading ModShark"', function () {
            let centeredText = wrapper.find('centered-text-stub');
            expect(centeredText.exists()).toBeTruthy();
            expect(centeredText.attributes().text).toEqual("Loading ModShark");
        });
        it('should redirect to home if refreshToken changes', function () {
            state.refreshToken = "new value";
            expect($router.replace.calledWith("/")).toBeTruthy();
        });
    })
});
