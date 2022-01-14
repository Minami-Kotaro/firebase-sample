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
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "@/firebase";

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
  Login(loginForm: LoginForm) {
    const { mail, password } = loginForm;
    signInWithEmailAndPassword(auth, mail, password)
      .then((userCredential) => {
        console.log("ok");
        console.log(userCredential);
        router.push("/todo");
      })
      .catch((error) => {
        alert(error.code + error.message);
      });
  }
  @Action({ rawError: true })
  Logout() {
    signOut(auth)
      .then(() => {
        console.log("signout");
        router.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

export default getModule(LoginModule);
