import router from "@/router";
import { LoginForm } from "@/types/login";
import {
  Module,
  VuexModule,
  Mutation,
  Action,
  getModule,
} from "vuex-module-decorators";
import store from "..";

@Module({ dynamic: true, store, name: "LoginModule", namespaced: true })
class LoginModule extends VuexModule {
  loginForm: LoginForm = {
    mail: "",
    password: "",
  };

  @Mutation
  SET_LOGIN_FORM(data: LoginForm) {
    this.loginForm = data;
  }

  @Action({ rawError: true })
  inputLoginForm(data: LoginForm) {
    this.SET_LOGIN_FORM(data);
  }
  @Action({ rawError: true })
  Login() {
    console.log("login");
    router.push("/todo");
  }
}

export default getModule(LoginModule);
