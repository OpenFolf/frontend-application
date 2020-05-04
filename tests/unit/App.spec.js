import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Router from "vue-router";
import App from "@/App.vue";
import Vuetify from "vuetify";

describe("App.vue", () => {
  const stubs = ["router-link", "router-view"];
  const localVue = createLocalVue();

  localVue.use(Vuex);
  localVue.use(Vuetify);
  localVue.use(Router);

  it("If user is in the Lobby or Scorecard, do not show BottomNav", () => {
    const getters = {
      signedIn: () => true,
      getBottomNav: () => false,
    };
    const store = new Vuex.Store({
      getters,
    });
    const wrapper = shallowMount(App, { stubs, store, localVue });
    expect(wrapper.contains('[data-testid="bottom-nav"]')).toBe(false);
  });

  it("If user is not in the Lobby or Scorecard, show BottomNav", () => {
    const getters = {
      signedIn: () => true,
      getBottomNav: () => true,
    };
    const store = new Vuex.Store({
      getters,
    });
    const wrapper = shallowMount(App, { stubs, store, localVue });
    expect(wrapper.contains('[data-testid="bottom-nav"]')).toBe(true);
  });
});

// describe("App", () => {
//   test("If user is in the Lobby or Scorecard, do not show BottomNav", () => {
//     const wrapper = mount(App);
//     wrapper.setData({ loggedIn: true });
//     expect(wrapper.find("bottom-nav").isVisible()).toBe(false);
//   });
//   it("If user is not in the Lobby or Scorecard, show BottomNav", async () => {
//     const wrapper = mount(App);
//     wrapper.setData({ loggedIn: true });

//     await wrapper.vm.$nextTick();
//     expect(wrapper.find("bottom-nav").isVisible()).toBe(true);
//   });
// });

// import { shallowMount } from "@vue/test-utils";
// import { mount } from "@vue/test-utils";

// describe("HelloWorld.vue", () => {
//   it("renders props.msg when passed", () => {
//     const msg = "new message";
//     const wrapper = shallowMount(HelloWorld, {
//       propsData: { msg },
//     });
//     expect(wrapper.text()).toMatch(msg);
//   });
// });

// test("If button is clicked, randomNumber should be between 200 and 300", async () => {
//   const wrapper = mount(RandomNumber, {
//     propsData: {
//       min: 200,
//       max: 300,
//     },
//   });

//   wrapper.find("button").trigger("click");
//   await wrapper.vm.$nextTick();

//   const randomNumber = parseInt(wrapper.find("span").element.textContent);
//   expect(randomNumber).toBeGreaterThanOrEqual(200);
//   expect(randomNumber).toBeLessThanOrEqual(300);
// });

// beforeEach(() => {
// stubs = ["router-link", "router-view"];
// getters = {
//   signedIn: () => true,
//   getBottomNav: () => true,
// };
// store = new Vuex.Store({
//   getters,
// });
// });

// it("Renders a Vue instance", () => {
//   expect(shallowMount(App, { stubs, store, localVue }).isVueInstance()).toBe(true);
// });
