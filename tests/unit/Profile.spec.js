import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Vuetify from "vuetify";
import Vuelidate from "vuelidate";
import Profile from "@/components/home/Profile.vue";

describe("Profile.vue", () => {
  const localVue = createLocalVue();

  localVue.use(Vuex);
  localVue.use(Vuetify);
  localVue.use(Vuelidate);

  it("Renders a Vue instance", () => {
    const actions = {
      setUserName: jest.fn(),
      setUserTheme: jest.fn(),
      signOutRouting: jest.fn(),
    };
    const getters = {
      getUserName: () => "USR",
      getIsUserDark: () => true,
      signedIn: () => true,
      errorMsg: () => ({ errorMsg: { message: "" } }),
    };
    const store = new Vuex.Store({
      getters,
      actions,
    });
    const wrapper = shallowMount(Profile, { store, localVue });
    expect(wrapper.isVueInstance()).toBe(true);
  });

  it("Renders the user name", () => {
    const actions = {
      setUserName: jest.fn(),
      setUserTheme: jest.fn(),
      signOutRouting: jest.fn(),
    };
    const getters = {
      getUserName: () => "USR",
      getIsUserDark: () => true,
      signedIn: () => true,
      errorMsg: () => ({ errorMsg: { message: "" } }),
    };
    const store = new Vuex.Store({
      getters,
      actions,
    });
    const wrapper = shallowMount(Profile, { store, localVue });
    const domUserName = wrapper.find('[data-testid="user-name"]');
    expect(domUserName.text()).toBe(getters.getUserName());
  });

  it("Shows sunny button when isDark is true", () => {
    const actions = {
      setUserName: jest.fn(),
      setUserTheme: jest.fn(),
      signOutRouting: jest.fn(),
    };
    const getters = {
      getUserName: () => "USR",
      getIsUserDark: () => true,
      signedIn: () => true,
      errorMsg: () => ({ errorMsg: { message: "" } }),
    };
    const store = new Vuex.Store({
      getters,
      actions,
    });
    const wrapper = shallowMount(Profile, { store, localVue });
    const button = wrapper.find('[data-testid="user-theme-button"]');
    expect(button.text()).toBe("fa-sun");
  });

  it("Shows moon button when isDark is false", () => {
    const actions = {
      setUserName: jest.fn(),
      setUserTheme: jest.fn(),
      signOutRouting: jest.fn(),
    };
    const getters = {
      getUserName: () => "USR",
      getIsUserDark: () => false,
      signedIn: () => true,
      errorMsg: () => ({ errorMsg: { message: "" } }),
    };
    const store = new Vuex.Store({
      getters,
      actions,
    });
    const wrapper = shallowMount(Profile, { store, localVue });
    const button = wrapper.find('[data-testid="user-theme-button"]');
    expect(button.text()).toBe("fa-moon");
  });
});
